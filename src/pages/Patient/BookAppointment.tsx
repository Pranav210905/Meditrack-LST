import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, FileText, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { collection, addDoc, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../../config/firebase';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../components/UI/LoadingSpinner';

interface Doctor {
  id: string;
  firstName: string;
  lastName: string;
  specialization: string;
}

const BookAppointment: React.FC = () => {
  const { userData } = useAuth();
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    doctorId: '',
    date: '',
    time: '',
    concern: '',
  });

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
  ];

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const q = query(
        collection(db, 'users'),
        where('role', '==', 'doctor'),
        orderBy('firstName')
      );
      const querySnapshot = await getDocs(q);
      const doctorList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Doctor));
      setDoctors(doctorList);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      toast.error('Failed to load doctors');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.doctorId || !formData.date || !formData.time || !formData.concern.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    // Check if date is in the past
    const selectedDate = new Date(formData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      toast.error('Cannot book appointments for past dates');
      return;
    }

    setLoading(true);

    try {
      // Check daily appointment limit (max 2 per day)
      const startOfDay = new Date(selectedDate);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(selectedDate);
      endOfDay.setHours(23, 59, 59, 999);

      const q = query(
        collection(db, 'appointments'),
        where('patientId', '==', userData?.uid),
        where('date', '>=', startOfDay),
        where('date', '<=', endOfDay)
      );
      
      const existingAppointments = await getDocs(q);
      
      if (existingAppointments.size >= 2) {
        toast.error('You can only book maximum 2 appointments per day');
        setLoading(false);
        return;
      }

      const selectedDoctor = doctors.find(d => d.id === formData.doctorId);
      
      const appointmentData = {
        patientId: userData?.uid,
        patientName: `${userData?.firstName} ${userData?.lastName}`,
        doctorId: formData.doctorId,
        doctorName: `${selectedDoctor?.firstName} ${selectedDoctor?.lastName}`,
        date: new Date(`${formData.date}T${formData.time}`),
        time: formData.time,
        concern: formData.concern.trim(),
        status: 'pending',
        createdAt: new Date(),
      };

      await addDoc(collection(db, 'appointments'), appointmentData);
      
      toast.success('Appointment request submitted successfully!');
      navigate('/patient/appointments');
    } catch (error) {
      console.error('Error booking appointment:', error);
      toast.error('Failed to book appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Book New Appointment
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Schedule your appointment with one of our doctors
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Doctor Selection */}
            <div>
              <label htmlFor="doctorId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Doctor
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  id="doctorId"
                  name="doctorId"
                  required
                  value={formData.doctorId}
                  onChange={handleChange}
                  className="appearance-none rounded-lg relative block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-kelly-500 focus:border-kelly-500 sm:text-sm transition-colors duration-200"
                >
                  <option value="">Choose a doctor</option>
                  {doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      Dr. {doctor.firstName} {doctor.lastName} - {doctor.specialization}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date Selection */}
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Preferred Date
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="date"
                  name="date"
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={formData.date}
                  onChange={handleChange}
                  className="appearance-none rounded-lg relative block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-kelly-500 focus:border-kelly-500 sm:text-sm transition-colors duration-200"
                />
              </div>
            </div>

            {/* Time Selection */}
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Preferred Time
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Clock className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  id="time"
                  name="time"
                  required
                  value={formData.time}
                  onChange={handleChange}
                  className="appearance-none rounded-lg relative block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-kelly-500 focus:border-kelly-500 sm:text-sm transition-colors duration-200"
                >
                  <option value="">Select time</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Health Concern */}
            <div>
              <label htmlFor="concern" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Health Concern
              </label>
              <div className="relative">
                <div className="absolute top-3 left-3 pointer-events-none">
                  <FileText className="h-5 w-5 text-gray-400" />
                </div>
                <textarea
                  id="concern"
                  name="concern"
                  rows={4}
                  required
                  maxLength={200}
                  value={formData.concern}
                  onChange={handleChange}
                  className="appearance-none rounded-lg relative block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-kelly-500 focus:border-kelly-500 sm:text-sm transition-colors duration-200 resize-none"
                  placeholder="Briefly describe your health concern or reason for visit..."
                />
              </div>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {formData.concern.length}/200 characters
              </p>
            </div>

            {/* Important Notice */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-800 dark:text-blue-200">
                  <p className="font-medium mb-1">Important Notes:</p>
                  <ul className="space-y-1 text-xs">
                    <li>• Maximum 2 appointments per day allowed</li>
                    <li>• Appointments are subject to doctor approval</li>
                    <li>• You will receive a notification once approved/rejected</li>
                    <li>• Please arrive 15 minutes before your scheduled time</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => navigate('/patient')}
                className="flex-1 py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-kelly-600 to-forest-600 text-white font-medium rounded-lg hover:from-kelly-500 hover:to-forest-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-kelly-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
              >
                {loading ? (
                  <LoadingSpinner size="sm" className="text-white" />
                ) : (
                  'Book Appointment'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
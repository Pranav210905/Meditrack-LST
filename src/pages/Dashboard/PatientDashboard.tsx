import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  FileText, 
  User, 
  Plus,
  CheckCircle,
  XCircle,
  AlertCircle,
  Check,
  Pill
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { collection, query, where, onSnapshot, Timestamp } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { format } from 'date-fns';

interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  date: Date;
  time: string;
  concern: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  doctorNote?: string;
  createdAt: Date;
}

interface Prescription {
  id: string;
  appointmentId?: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  medicines: {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
  }[];
  notes?: string;
  createdAt: Date;
}

const PatientDashboard: React.FC = () => {
  const { userData } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userData?.uid) return;

    // Fetch appointments
    const appointmentsQuery = query(
      collection(db, 'appointments'),
      where('patientId', '==', userData.uid)
    );

    const unsubscribeAppointments = onSnapshot(appointmentsQuery, (snapshot) => {
      const appointmentData = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          date: data.date instanceof Timestamp ? data.date.toDate() : new Date(data.date),
          createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : new Date(data.createdAt),
        } as Appointment;
      });
      
      // Sort by date in descending order (most recent first)
      appointmentData.sort((a, b) => b.date.getTime() - a.date.getTime());
      
      setAppointments(appointmentData);
    });

    // Fetch prescriptions
    const prescriptionsQuery = query(
      collection(db, 'prescriptions'),
      where('patientId', '==', userData.uid)
    );

    const unsubscribePrescriptions = onSnapshot(prescriptionsQuery, (snapshot) => {
      const prescriptionData = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : new Date(data.createdAt),
        } as Prescription;
      });
      
      // Sort by date in descending order (most recent first)
      prescriptionData.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      
      setPrescriptions(prescriptionData);
      setLoading(false);
    });

    return () => {
      unsubscribeAppointments();
      unsubscribePrescriptions();
    };
  }, [userData?.uid]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'completed':
        return <Check className="h-5 w-5 text-blue-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      default:
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
    }
  };

  const upcomingAppointments = appointments.filter(
    apt => apt.status === 'approved' && apt.date >= new Date()
  );
  const pendingAppointments = appointments.filter(apt => apt.status === 'pending');
  const completedAppointments = appointments.filter(apt => apt.status === 'completed');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome, {userData?.firstName}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your appointments and track your healthcare journey.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="bg-kelly-100 dark:bg-kelly-900/20 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-kelly-600 dark:text-kelly-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Upcoming Appointments
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {upcomingAppointments.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="bg-yellow-100 dark:bg-yellow-900/20 p-3 rounded-full">
                <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Pending Approval
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {pendingAppointments.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-full">
                <Check className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Completed
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {completedAppointments.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 dark:bg-purple-900/20 p-3 rounded-full">
                <FileText className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Appointments
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {appointments.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Link
            to="/patient/book-appointment"
            className="bg-gradient-to-r from-kelly-600 to-forest-600 hover:from-kelly-500 hover:to-forest-500 text-white p-6 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md"
          >
            <div className="flex items-center">
              <Plus className="h-8 w-8" />
              <div className="ml-4">
                <h3 className="text-lg font-semibold">Book New Appointment</h3>
                <p className="text-kelly-100">Schedule your next visit</p>
              </div>
            </div>
          </Link>

          <Link
            to="/patient/prescriptions"
            className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 p-6 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md"
          >
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-gray-600 dark:text-gray-400" />
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  View Prescriptions
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Access your medical prescriptions
                </p>
              </div>
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Appointments */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Recent Appointments
                </h2>
                <Link
                  to="/patient/appointments"
                  className="text-kelly-600 dark:text-kelly-400 hover:text-kelly-500 dark:hover:text-kelly-300 font-medium text-sm transition-colors duration-200"
                >
                  View All
                </Link>
              </div>
            </div>

            <div className="p-6">
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-kelly-600"></div>
                </div>
              ) : appointments.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No appointments yet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Book your first appointment to get started with your healthcare journey.
                  </p>
                  <Link
                    to="/patient/book-appointment"
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-kelly-600 to-forest-600 text-white px-4 py-2 rounded-lg font-medium hover:from-kelly-500 hover:to-forest-500 transition-all duration-200"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Book Appointment</span>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {appointments.slice(0, 3).map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(appointment.status)}
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            Dr. {appointment.doctorName}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {format(appointment.date, 'MMM dd, yyyy')} at {appointment.time}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-500">
                            {appointment.concern}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Recent Prescriptions */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Recent Prescriptions
                </h2>
                <Link
                  to="/patient/prescriptions"
                  className="text-kelly-600 dark:text-kelly-400 hover:text-kelly-500 dark:hover:text-kelly-300 font-medium text-sm transition-colors duration-200"
                >
                  View All
                </Link>
              </div>
            </div>

            <div className="p-6">
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-kelly-600"></div>
                </div>
              ) : prescriptions.length === 0 ? (
                <div className="text-center py-8">
                  <Pill className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No prescriptions yet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Your prescriptions will appear here after your doctor creates them.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {prescriptions.slice(0, 3).map((prescription) => (
                    <div
                      key={prescription.id}
                      className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="bg-kelly-100 dark:bg-kelly-900/20 p-2 rounded-full">
                            <User className="h-4 w-4 text-kelly-600 dark:text-kelly-400" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              Dr. {prescription.doctorName}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {format(prescription.createdAt, 'MMM dd, yyyy')}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm">
                          <Pill className="h-4 w-4 text-gray-400" />
                          <span className="font-medium text-gray-700 dark:text-gray-300">
                            {prescription.medicines.length} medicine{prescription.medicines.length !== 1 ? 's' : ''}:
                          </span>
                        </div>
                        <div className="ml-6 space-y-1">
                          {prescription.medicines.slice(0, 2).map((medicine, index) => (
                            <p key={index} className="text-sm text-gray-600 dark:text-gray-400">
                              • {medicine.name} - {medicine.dosage}
                            </p>
                          ))}
                          {prescription.medicines.length > 2 && (
                            <p className="text-sm text-gray-500 dark:text-gray-500">
                              + {prescription.medicines.length - 2} more...
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
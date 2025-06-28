import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Plus, 
  User, 
  Calendar,
  Pill,
  Search,
  Edit,
  Trash2
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  doc, 
  updateDoc, 
  deleteDoc,
  getDocs,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../../config/firebase';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../components/UI/LoadingSpinner';

interface Prescription {
  id: string;
  appointmentId?: string;
  patientId: string;
  patientName: string;
  medicines: {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
  }[];
  notes?: string;
  createdAt: Date;
}

interface Patient {
  id: string;
  firstName: string;
  lastName: string;
}

const DoctorPrescriptions: React.FC = () => {
  const { userData } = useAuth();
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingPrescription, setEditingPrescription] = useState<Prescription | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    patientId: '',
    medicines: [{ name: '', dosage: '', frequency: '', duration: '' }],
    notes: '',
  });

  useEffect(() => {
    if (!userData?.uid) return;

    // Fetch prescriptions
    const prescriptionsQuery = query(
      collection(db, 'prescriptions'),
      where('doctorId', '==', userData.uid),
      orderBy('createdAt', 'desc')
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
      setPrescriptions(prescriptionData);
      setLoading(false);
    });

    // Fetch patients
    fetchPatients();

    return () => unsubscribePrescriptions();
  }, [userData?.uid]);

  const fetchPatients = async () => {
    try {
      const q = query(
        collection(db, 'users'),
        where('role', '==', 'patient'),
        orderBy('firstName')
      );
      const querySnapshot = await getDocs(q);
      const patientList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Patient));
      setPatients(patientList);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const handleMedicineChange = (index: number, field: string, value: string) => {
    const updatedMedicines = [...formData.medicines];
    updatedMedicines[index] = { ...updatedMedicines[index], [field]: value };
    setFormData({ ...formData, medicines: updatedMedicines });
  };

  const addMedicine = () => {
    setFormData({
      ...formData,
      medicines: [...formData.medicines, { name: '', dosage: '', frequency: '', duration: '' }]
    });
  };

  const removeMedicine = (index: number) => {
    if (formData.medicines.length > 1) {
      const updatedMedicines = formData.medicines.filter((_, i) => i !== index);
      setFormData({ ...formData, medicines: updatedMedicines });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.patientId) {
      toast.error('Please select a patient');
      return;
    }

    const validMedicines = formData.medicines.filter(med => 
      med.name.trim() && med.dosage.trim() && med.frequency.trim() && med.duration.trim()
    );

    if (validMedicines.length === 0) {
      toast.error('Please add at least one complete medicine');
      return;
    }

    try {
      const selectedPatient = patients.find(p => p.id === formData.patientId);
      
      const prescriptionData = {
        doctorId: userData?.uid,
        doctorName: `${userData?.firstName} ${userData?.lastName}`,
        patientId: formData.patientId,
        patientName: `${selectedPatient?.firstName} ${selectedPatient?.lastName}`,
        medicines: validMedicines,
        notes: formData.notes.trim(),
        createdAt: new Date(),
      };

      if (editingPrescription) {
        await updateDoc(doc(db, 'prescriptions', editingPrescription.id), prescriptionData);
        toast.success('Prescription updated successfully!');
      } else {
        await addDoc(collection(db, 'prescriptions'), prescriptionData);
        toast.success('Prescription created successfully!');
      }

      resetForm();
    } catch (error) {
      console.error('Error saving prescription:', error);
      toast.error('Failed to save prescription');
    }
  };

  const handleEdit = (prescription: Prescription) => {
    setEditingPrescription(prescription);
    setFormData({
      patientId: prescription.patientId,
      medicines: prescription.medicines,
      notes: prescription.notes || '',
    });
    setShowCreateForm(true);
  };

  const handleDelete = async (prescriptionId: string) => {
    if (window.confirm('Are you sure you want to delete this prescription?')) {
      try {
        await deleteDoc(doc(db, 'prescriptions', prescriptionId));
        toast.success('Prescription deleted successfully!');
      } catch (error) {
        console.error('Error deleting prescription:', error);
        toast.error('Failed to delete prescription');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      patientId: '',
      medicines: [{ name: '', dosage: '', frequency: '', duration: '' }],
      notes: '',
    });
    setShowCreateForm(false);
    setEditingPrescription(null);
  };

  const filteredPrescriptions = prescriptions.filter(prescription =>
    prescription.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prescription.medicines.some(med => med.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Manage Prescriptions
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Create and manage patient prescriptions
            </p>
          </div>
          <button
            onClick={() => setShowCreateForm(true)}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-kelly-600 to-forest-600 text-white px-6 py-3 rounded-lg font-medium hover:from-kelly-500 hover:to-forest-500 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <Plus className="h-5 w-5" />
            <span>New Prescription</span>
          </button>
        </div>

        {/* Stats Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex items-center">
            <div className="bg-kelly-100 dark:bg-kelly-900/20 p-3 rounded-full">
              <FileText className="h-6 w-6 text-kelly-600 dark:text-kelly-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Prescriptions
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {prescriptions.length}
              </p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by patient name or medicine..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-kelly-500 focus:border-kelly-500 sm:text-sm transition-colors duration-200"
            />
          </div>
        </div>

        {/* Create/Edit Form */}
        {showCreateForm && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {editingPrescription ? 'Edit Prescription' : 'Create New Prescription'}
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Patient Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Select Patient
                </label>
                <select
                  value={formData.patientId}
                  onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-kelly-500 focus:border-kelly-500"
                  required
                >
                  <option value="">Choose a patient</option>
                  {patients.map((patient) => (
                    <option key={patient.id} value={patient.id}>
                      {patient.firstName} {patient.lastName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Medicines */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Medicines
                  </label>
                  <button
                    type="button"
                    onClick={addMedicine}
                    className="inline-flex items-center space-x-1 text-kelly-600 dark:text-kelly-400 hover:text-kelly-500 dark:hover:text-kelly-300 text-sm font-medium"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Medicine</span>
                  </button>
                </div>
                <div className="space-y-4">
                  {formData.medicines.map((medicine, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                            Medicine Name
                          </label>
                          <input
                            type="text"
                            value={medicine.name}
                            onChange={(e) => handleMedicineChange(index, 'name', e.target.value)}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-kelly-500 focus:border-kelly-500"
                            placeholder="e.g., Paracetamol"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                            Dosage
                          </label>
                          <input
                            type="text"
                            value={medicine.dosage}
                            onChange={(e) => handleMedicineChange(index, 'dosage', e.target.value)}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-kelly-500 focus:border-kelly-500"
                            placeholder="e.g., 500mg"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                            Frequency
                          </label>
                          <input
                            type="text"
                            value={medicine.frequency}
                            onChange={(e) => handleMedicineChange(index, 'frequency', e.target.value)}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-kelly-500 focus:border-kelly-500"
                            placeholder="e.g., 3 times daily"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                            Duration
                          </label>
                          <input
                            type="text"
                            value={medicine.duration}
                            onChange={(e) => handleMedicineChange(index, 'duration', e.target.value)}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-kelly-500 focus:border-kelly-500"
                            placeholder="e.g., 7 days"
                            required
                          />
                        </div>
                      </div>
                      {formData.medicines.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeMedicine(index)}
                          className="text-red-600 dark:text-red-400 hover:text-red-500 dark:hover:text-red-300 text-sm font-medium"
                        >
                          Remove Medicine
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Additional Notes (Optional)
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-kelly-500 focus:border-kelly-500 resize-none"
                  placeholder="Any additional instructions or notes..."
                />
              </div>

              {/* Actions */}
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-kelly-600 to-forest-600 text-white font-medium rounded-lg hover:from-kelly-500 hover:to-forest-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-kelly-500 transition-all duration-200"
                >
                  {editingPrescription ? 'Update Prescription' : 'Create Prescription'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Prescriptions List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <LoadingSpinner size="lg" />
              </div>
            ) : filteredPrescriptions.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  {searchTerm ? 'No prescriptions found' : 'No prescriptions yet'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {searchTerm 
                    ? 'Try adjusting your search terms.'
                    : 'Create your first prescription to get started.'
                  }
                </p>
                {!searchTerm && (
                  <button
                    onClick={() => setShowCreateForm(true)}
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-kelly-600 to-forest-600 text-white px-6 py-3 rounded-lg font-medium hover:from-kelly-500 hover:to-forest-500 transition-all duration-200"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Create Prescription</span>
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredPrescriptions.map((prescription) => (
                  <div
                    key={prescription.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4">
                        <div className="bg-kelly-100 dark:bg-kelly-900/20 p-3 rounded-full">
                          <User className="h-6 w-6 text-kelly-600 dark:text-kelly-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {prescription.patientName}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mt-1">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{format(prescription.createdAt, 'MMMM dd, yyyy')}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEdit(prescription)}
                          className="p-2 text-gray-600 dark:text-gray-400 hover:text-kelly-600 dark:hover:text-kelly-400 transition-colors duration-200"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(prescription.id)}
                          className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Medicines */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                        <Pill className="h-4 w-4 mr-2" />
                        Prescribed Medicines
                      </h4>
                      <div className="space-y-3">
                        {prescription.medicines.map((medicine, index) => (
                          <div
                            key={index}
                            className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                              <div>
                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                  Medicine
                                </p>
                                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                  {medicine.name}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                  Dosage
                                </p>
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                  {medicine.dosage}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                  Frequency
                                </p>
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                  {medicine.frequency}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                  Duration
                                </p>
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                  {medicine.duration}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Notes */}
                    {prescription.notes && (
                      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                        <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">
                          Additional Notes:
                        </h4>
                        <p className="text-sm text-blue-800 dark:text-blue-200">
                          {prescription.notes}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorPrescriptions;
import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Download, 
  Calendar, 
  User,
  Pill,
  Clock
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { collection, query, where, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { format } from 'date-fns';
import jsPDF from 'jspdf';

interface Prescription {
  id: string;
  appointmentId: string;
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

const PatientPrescriptions: React.FC = () => {
  const { userData } = useAuth();
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userData?.uid) return;

    const q = query(
      collection(db, 'prescriptions'),
      where('patientId', '==', userData.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
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

    return () => unsubscribe();
  }, [userData?.uid]);

  const downloadPrescription = (prescription: Prescription) => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.text('MediTrack - Medical Prescription', 20, 30);
    
    // Patient Info
    doc.setFontSize(12);
    doc.text(`Patient: ${userData?.firstName} ${userData?.lastName}`, 20, 50);
    doc.text(`Doctor: Dr. ${prescription.doctorName}`, 20, 60);
    doc.text(`Date: ${format(prescription.createdAt, 'MMMM dd, yyyy')}`, 20, 70);
    
    // Medicines
    doc.setFontSize(14);
    doc.text('Prescribed Medicines:', 20, 90);
    
    let yPosition = 105;
    prescription.medicines.forEach((medicine, index) => {
      doc.setFontSize(12);
      doc.text(`${index + 1}. ${medicine.name}`, 25, yPosition);
      doc.text(`   Dosage: ${medicine.dosage}`, 25, yPosition + 10);
      doc.text(`   Frequency: ${medicine.frequency}`, 25, yPosition + 20);
      doc.text(`   Duration: ${medicine.duration}`, 25, yPosition + 30);
      yPosition += 45;
    });
    
    // Notes
    if (prescription.notes) {
      doc.setFontSize(14);
      doc.text('Additional Notes:', 20, yPosition + 10);
      doc.setFontSize(12);
      const splitNotes = doc.splitTextToSize(prescription.notes, 170);
      doc.text(splitNotes, 20, yPosition + 25);
    }
    
    doc.save(`prescription-${format(prescription.createdAt, 'yyyy-MM-dd')}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            My Prescriptions
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            View and download your medical prescriptions
          </p>
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

        {/* Prescriptions List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-kelly-600"></div>
              </div>
            ) : prescriptions.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No prescriptions yet
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Your prescriptions will appear here after your doctor creates them.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {prescriptions.map((prescription) => (
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
                            Dr. {prescription.doctorName}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mt-1">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{format(prescription.createdAt, 'MMMM dd, yyyy')}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{format(prescription.createdAt, 'hh:mm a')}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => downloadPrescription(prescription)}
                        className="inline-flex items-center space-x-2 bg-kelly-600 hover:bg-kelly-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                      >
                        <Download className="h-4 w-4" />
                        <span>Download PDF</span>
                      </button>
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

export default PatientPrescriptions;
import React from 'react';
import { 
  Calendar, 
  Users, 
  FileText, 
  Shield, 
  Clock, 
  Heart,
  CheckCircle,
  Smartphone,
  BarChart3,
  Bell,
  Download,
  Lock
} from 'lucide-react';

const FeaturesPage: React.FC = () => {
  const features = [
    {
      icon: Calendar,
      title: 'Smart Appointment Scheduling',
      description: 'Effortless booking system with real-time availability, automated confirmations, and intelligent conflict resolution.',
      benefits: [
        'Real-time availability checking',
        'Automated email confirmations',
        'Conflict detection and resolution',
        'Recurring appointment support'
      ]
    },
    {
      icon: Users,
      title: 'Multi-Role Dashboard',
      description: 'Tailored interfaces for patients, doctors, and administrators with role-based permissions and workflows.',
      benefits: [
        'Patient self-service portal',
        'Doctor management interface',
        'Admin oversight dashboard',
        'Customizable user permissions'
      ]
    },
    {
      icon: FileText,
      title: 'Digital Prescription Management',
      description: 'Create, manage, and share prescriptions digitally with PDF export and comprehensive medication tracking.',
      benefits: [
        'Digital prescription creation',
        'PDF export functionality',
        'Medication history tracking',
        'Drug interaction warnings'
      ]
    },
    {
      icon: Shield,
      title: 'HIPAA-Compliant Security',
      description: 'Enterprise-grade security with end-to-end encryption, audit trails, and compliance monitoring.',
      benefits: [
        'End-to-end encryption',
        'Comprehensive audit trails',
        'Access control management',
        'Compliance reporting'
      ]
    },
    {
      icon: Clock,
      title: 'Real-Time Updates',
      description: 'Instant notifications for appointment changes, status updates, and important healthcare reminders.',
      benefits: [
        'Push notifications',
        'Email alerts',
        'SMS reminders',
        'Real-time status updates'
      ]
    },
    {
      icon: Heart,
      title: 'Patient-Centered Care',
      description: 'Designed with patient experience in mind, making healthcare more accessible and user-friendly.',
      benefits: [
        'Intuitive user interface',
        'Mobile-responsive design',
        'Accessibility features',
        'Multi-language support'
      ]
    },
    {
      icon: Smartphone,
      title: 'Mobile-First Design',
      description: 'Fully responsive design optimized for mobile devices, tablets, and desktop computers.',
      benefits: [
        'Mobile app experience',
        'Touch-friendly interface',
        'Offline capability',
        'Cross-platform compatibility'
      ]
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Comprehensive reporting and analytics to help healthcare providers make data-driven decisions.',
      benefits: [
        'Patient flow analytics',
        'Appointment trends',
        'Revenue reporting',
        'Performance metrics'
      ]
    },
    {
      icon: Bell,
      title: 'Smart Notifications',
      description: 'Intelligent notification system that keeps all stakeholders informed without overwhelming them.',
      benefits: [
        'Customizable alerts',
        'Priority-based notifications',
        'Quiet hours support',
        'Notification preferences'
      ]
    },
    {
      icon: Download,
      title: 'Data Export & Backup',
      description: 'Comprehensive data export capabilities with automated backups and disaster recovery.',
      benefits: [
        'Automated daily backups',
        'Custom data exports',
        'Disaster recovery',
        'Data portability'
      ]
    },
    {
      icon: Lock,
      title: 'Advanced Access Control',
      description: 'Granular permission system with multi-factor authentication and session management.',
      benefits: [
        'Multi-factor authentication',
        'Role-based permissions',
        'Session timeout controls',
        'IP-based restrictions'
      ]
    },
    {
      icon: FileText,
      title: 'Electronic Health Records',
      description: 'Comprehensive EHR system with patient history, medical records, and treatment tracking.',
      benefits: [
        'Complete patient history',
        'Medical record management',
        'Treatment plan tracking',
        'Lab result integration'
      ]
    }
  ];

  const stats = [
    { number: '99.9%', label: 'Uptime Guarantee' },
    { number: '< 2s', label: 'Average Response Time' },
    { number: '256-bit', label: 'SSL Encryption' },
    { number: '24/7', label: 'Customer Support' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-kelly-50 to-forest-50 dark:from-gray-800 dark:to-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Powerful Features for
              <span className="block bg-gradient-to-r from-kelly-600 to-forest-600 bg-clip-text text-transparent">
                Modern Healthcare
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
              Discover how MediTrack's comprehensive feature set can transform your healthcare practice 
              and improve patient outcomes through innovative technology.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-kelly-600 dark:text-kelly-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Complete Healthcare Management Solution
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Every feature is designed to streamline your workflow, enhance patient care, 
              and improve operational efficiency.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200 hover:border-kelly-200 dark:hover:border-kelly-800"
                >
                  <div className="bg-gradient-to-r from-kelly-600 to-forest-600 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {feature.description}
                  </p>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-kelly-600 dark:text-kelly-400 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Seamless Integration & Scalability
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                MediTrack integrates seamlessly with existing healthcare systems and scales 
                effortlessly as your practice grows. Our API-first approach ensures compatibility 
                with your current workflow.
              </p>
              <div className="space-y-4">
                {[
                  'RESTful API for custom integrations',
                  'HL7 FHIR compliance for interoperability',
                  'Cloud-native architecture for scalability',
                  'Single sign-on (SSO) support',
                  'Third-party lab integration',
                  'Insurance verification systems'
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-kelly-600 dark:text-kelly-400 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-kelly-50 to-forest-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: Shield, label: 'Security First' },
                  { icon: Clock, label: 'Real-time Sync' },
                  { icon: BarChart3, label: 'Analytics' },
                  { icon: Smartphone, label: 'Mobile Ready' }
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="text-center">
                      <div className="bg-white dark:bg-gray-800 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-3 shadow-sm">
                        <Icon className="h-8 w-8 text-kelly-600 dark:text-kelly-400" />
                      </div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {item.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-kelly-600 to-forest-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Experience These Features?
          </h2>
          <p className="text-xl text-kelly-100 mb-8">
            Start your free trial today and see how MediTrack can transform your healthcare practice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/register"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-kelly-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Start Free Trial
            </a>
            <a
              href="/about"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-kelly-600 transition-colors duration-200"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage;
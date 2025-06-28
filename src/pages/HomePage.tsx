import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Users, 
  FileText, 
  Shield, 
  Clock, 
  Heart,
  ArrowRight,
  CheckCircle,
  Star
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const HomePage: React.FC = () => {
  const { currentUser, userData } = useAuth();

  const features = [
    {
      icon: Calendar,
      title: 'Smart Scheduling',
      description: 'Effortless appointment booking with real-time availability and automated confirmations.',
    },
    {
      icon: Users,
      title: 'Multi-Role Access',
      description: 'Separate dashboards for patients, doctors, and administrators with role-based permissions.',
    },
    {
      icon: FileText,
      title: 'Digital Prescriptions',
      description: 'Create, manage, and share prescriptions digitally with PDF export capabilities.',
    },
    {
      icon: Shield,
      title: 'Secure & Compliant',
      description: 'HIPAA-compliant data handling with advanced security measures and encryption.',
    },
    {
      icon: Clock,
      title: 'Real-Time Updates',
      description: 'Instant notifications for appointment changes, confirmations, and important updates.',
    },
    {
      icon: Heart,
      title: 'Patient-Centered',
      description: 'Designed with patient experience in mind, making healthcare more accessible.',
    },
  ];

  const testimonials = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Family Medicine',
      content: 'MediTrack has revolutionized how I manage my practice. The efficiency gains are remarkable.',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Patient',
      content: 'Booking appointments has never been easier. The real-time updates keep me informed.',
      rating: 5,
    },
    {
      name: 'Dr. Emily Rodriguez',
      role: 'Pediatrician',
      content: 'The prescription management feature saves me hours every week. Highly recommended!',
      rating: 5,
    },
  ];

  if (currentUser && userData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Welcome back, {userData.firstName}!
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Access your {userData.role} dashboard to manage your healthcare needs.
            </p>
            <Link
              to={`/${userData.role}`}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-kelly-600 to-forest-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-kelly-500 hover:to-forest-500 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <span>Go to Dashboard</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-kelly-50 to-forest-50 dark:from-gray-800 dark:to-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Modern Healthcare
              <span className="block bg-gradient-to-r from-kelly-600 to-forest-600 bg-clip-text text-transparent">
                Management
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
              Streamline your clinic operations with our comprehensive management system. 
              Book appointments, manage prescriptions, and enhance patient care—all in one platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-kelly-600 to-forest-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-kelly-500 hover:to-forest-500 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <span>Get Started Free</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/features"
                className="inline-flex items-center space-x-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-8 py-4 rounded-lg font-semibold border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 shadow-sm"
              >
                <span>Learn More</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need for Modern Healthcare
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Comprehensive tools designed to enhance efficiency, improve patient care, 
              and streamline clinical workflows.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl hover:shadow-lg transition-all duration-200 border border-gray-200 dark:border-gray-700 hover:border-kelly-200 dark:hover:border-kelly-800"
                >
                  <div className="bg-gradient-to-r from-kelly-600 to-forest-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-r from-kelly-50 to-forest-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Why Choose MediTrack?
              </h2>
              <div className="space-y-4">
                {[
                  'Reduce administrative overhead by up to 60%',
                  'Improve patient satisfaction with seamless booking',
                  'Enhance data security with enterprise-grade protection',
                  'Scale effortlessly as your practice grows',
                  'Access comprehensive analytics and insights',
                  '24/7 customer support and onboarding assistance',
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-kelly-600 dark:text-kelly-400 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
              <div className="text-center">
                <div className="bg-gradient-to-r from-kelly-600 to-forest-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Start Your Free Trial
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Experience the future of healthcare management with our 30-day free trial. 
                  No credit card required.
                </p>
                <Link
                  to="/register"
                  className="w-full inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-kelly-600 to-forest-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-kelly-500 hover:to-forest-500 transition-all duration-200"
                >
                  <span>Start Free Trial</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Trusted by Healthcare Professionals
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              See what doctors and patients are saying about MediTrack
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-kelly-600 to-forest-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Healthcare Practice?
          </h2>
          <p className="text-xl text-kelly-100 mb-8">
            Join thousands of healthcare professionals who trust MediTrack for their practice management needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="inline-flex items-center space-x-2 bg-white text-kelly-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <span>Start Your Free Trial</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center space-x-2 border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-kelly-600 transition-all duration-200"
            >
              <span>Sign In</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
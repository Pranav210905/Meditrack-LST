import React from 'react';
import { 
  Heart, 
  Users, 
  Award, 
  Globe,
  CheckCircle,
  Star,
  ArrowRight,
  Shield,
  Clock,
  Zap
} from 'lucide-react';

const AboutPage: React.FC = () => {
  const values = [
    {
      icon: Heart,
      title: 'Patient-Centered Care',
      description: 'Every decision we make is guided by what\'s best for patient outcomes and experience.'
    },
    {
      icon: Shield,
      title: 'Security & Privacy',
      description: 'We maintain the highest standards of data security and patient privacy protection.'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Continuously evolving our platform with cutting-edge technology and user feedback.'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Fostering better communication between patients, doctors, and healthcare teams.'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Healthcare Providers' },
    { number: '500K+', label: 'Patients Served' },
    { number: '99.9%', label: 'System Uptime' },
    { number: '24/7', label: 'Support Available' }
  ];

  const team = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Chief Medical Officer',
      description: 'Former practicing physician with 15+ years in healthcare technology.',
      image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Michael Chen',
      role: 'Chief Technology Officer',
      description: 'Software architect specializing in healthcare systems and security.',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Product',
      description: 'UX expert focused on creating intuitive healthcare experiences.',
      image: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const milestones = [
    {
      year: '2020',
      title: 'Company Founded',
      description: 'Started with a vision to modernize healthcare management'
    },
    {
      year: '2021',
      title: 'First 1,000 Users',
      description: 'Reached our first major milestone with early adopters'
    },
    {
      year: '2022',
      title: 'HIPAA Certification',
      description: 'Achieved full HIPAA compliance and security certification'
    },
    {
      year: '2023',
      title: 'Mobile App Launch',
      description: 'Released native mobile applications for iOS and Android'
    },
    {
      year: '2024',
      title: 'AI Integration',
      description: 'Introduced AI-powered scheduling and patient insights'
    },
    {
      year: '2025',
      title: 'Global Expansion',
      description: 'Expanding to serve healthcare providers worldwide'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-kelly-50 to-forest-50 dark:from-gray-800 dark:to-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Transforming Healthcare
              <span className="block bg-gradient-to-r from-kelly-600 to-forest-600 bg-clip-text text-transparent">
                One Clinic at a Time
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
              We're on a mission to make healthcare more accessible, efficient, and patient-centered 
              through innovative technology and thoughtful design.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                At MediTrack, we believe that technology should enhance the human connection in healthcare, 
                not replace it. Our platform is designed to eliminate administrative burdens so healthcare 
                providers can focus on what matters most: caring for their patients.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                We're committed to creating solutions that are not only powerful and secure but also 
                intuitive and accessible to healthcare providers of all technical backgrounds.
              </p>
              <div className="space-y-4">
                {[
                  'Reduce administrative overhead by up to 60%',
                  'Improve patient satisfaction and engagement',
                  'Enhance data security and compliance',
                  'Enable better clinical decision-making'
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-kelly-600 dark:text-kelly-400 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-kelly-100 to-forest-100 dark:from-kelly-900/20 dark:to-forest-900/20 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-6">
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
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              These principles guide everything we do, from product development to customer support.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 text-center hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="bg-gradient-to-r from-kelly-600 to-forest-600 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Our Leadership Team
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our diverse team brings together expertise in healthcare, technology, and user experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-200"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-kelly-600 dark:text-kelly-400 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              From a small startup to a trusted healthcare technology partner.
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-kelly-200 dark:bg-kelly-800"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex items-center ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                      <div className="text-2xl font-bold text-kelly-600 dark:text-kelly-400 mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-kelly-600 dark:bg-kelly-400 rounded-full border-4 border-white dark:border-gray-900"></div>
                  </div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-kelly-600 to-forest-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Join Us in Transforming Healthcare
          </h2>
          <p className="text-xl text-kelly-100 mb-8">
            Whether you're a healthcare provider looking to modernize your practice or a patient 
            seeking better healthcare experiences, we're here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/register"
              className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-white text-kelly-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <span>Get Started Today</span>
              <ArrowRight className="h-5 w-5" />
            </a>
            <a
              href="/features"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-kelly-600 transition-colors duration-200"
            >
              Explore Features
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
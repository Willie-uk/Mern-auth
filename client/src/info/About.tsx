import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Footer from '../basic/Footer';

// Animation configurations
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Stagger effect - each child appears 0.2s after the previous one
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function About() {
  return (
    <motion.div
      style={{
        height: "100vh",
      }}
      className='px-5 mb-4'
      variants={staggerContainer}
      initial="hidden"
      animate="show"
    >
      <motion.h2 className="text-center my-5 fw-bold text-secondary" variants={fadeInUp}>
      Shoe.Store <span className='fw-bold my-4 text-dark'>About Page</span>
      </motion.h2>
      <motion.div variants={fadeInUp}>
        Welcome to Shoe.Store – Smart shoes<br />
        At Shoe.Store, we believe that compassionate care is the cornerstone of well-being, especially in times of vulnerability and healing. Our mission is to revolutionize the healthcare experience by seamlessly connecting patients with dedicated nurses, caregivers, and physiotherapists. We understand the challenges that individuals facing terminal illnesses and post-surgical recovery encounter, and we are committed to providing unparalleled support and assistance throughout their journey.
      </motion.div>
      <motion.div variants={fadeInUp}>
        <h3 className='text-start mt-4 text-success fw-bold'>Our Story</h3>
        Shoe.Store was born out of a deep commitment to humanizing healthcare. Recognizing the gaps in patient care, we set out to create a platform that fosters a collaborative and personalized approach to recovery. Founded by a team of healthcare professionals, technologists, and patient advocates, our company is driven by a shared vision of transforming healthcare into a more accessible, empathetic, and efficient system.
      </motion.div>
      <motion.div className='text-start' variants={fadeInUp}>
        <h3 className='my-4 text-success fw-bold'>Our Mission</h3>
        <h4 className='my-4'>Connecting Patients with Compassionate Care:</h4>
        At the core of Shoe.Store is the belief that every patient deserves a caring and dedicated support system. Our platform serves as a bridge, connecting patients with experienced and compassionate nurses, caregivers, and physiotherapists who are committed to providing personalized care tailored to each individual's unique needs.
        <h4 className='my-4'>Specialized Support for Terminal Illnesses and Post-Surgical Recovery:</h4>
        We specialize in catering to the unique needs of individuals facing terminal illnesses and those on the path to recovery post-surgery. Our team of professionals is trained to navigate the complexities of these situations, offering not only physical support but also emotional and mental well-being.
      </motion.div>
      <motion.div className='text-start' variants={fadeInUp}>
        <h3 className='my-4 text-success fw-bold'>Our Services</h3>
        <h4 className='my-4'>NurseLink:</h4>
        Our NurseLink service connects patients with qualified and experienced nurses who offer a wide range of medical support. Whether you require assistance with medication management, wound care, or monitoring vital signs, our nurses are here to ensure you receive the highest standard of care in the comfort of your own home.
        <h4 className='my-4'>CareConnect:</h4>
        For those in need of ongoing support, our CareConnect service links patients with compassionate caregivers who provide assistance with daily activities, companionship, and a comforting presence during challenging times. We understand the importance of preserving dignity and independence, and our caregivers are dedicated to fostering a sense of well-being.
        <h4 className='my-4'>PhysioLink:</h4>
        Physical rehabilitation is a crucial aspect of recovery, and our PhysioLink service connects patients with skilled physiotherapists who guide them through tailored exercises and rehabilitation programs. Whether recovering from surgery or managing chronic conditions, our physiotherapists work closely with patients to enhance mobility, reduce pain, and improve overall quality of life.
      </motion.div>
      <motion.div className='text-start' variants={fadeInUp}>
        <h3 className='my-4 text-success fw-bold'>Our Approach</h3>
        <h4 className='my-4'>Personalized Care Plans:</h4>
        No two patients are alike, and we recognize the importance of tailoring care plans to individual needs. Our team collaborates with patients, their families, and healthcare providers to create personalized care plans that address specific challenges and goals.
        <h4 className='my-4'>Technology-Driven Solutions:</h4>
        Shoe.Store leverages cutting-edge technology to streamline communication, coordinate care, and provide real-time updates to patients and their families. Our secure and user-friendly platform ensures seamless connectivity and enhances the overall healthcare experience.
        <h4 className='my-4'>Emphasis on Empathy:</h4>
        We understand that healing extends beyond the physical, and emotional well-being is equally crucial. Our team is trained to approach care with empathy, compassion, and respect, fostering a supportive environment for both patients and their families.
      </motion.div>
      <motion.div className='text-center my-5' variants={fadeInUp}>
        <h4 className='my-2'>
          <Link style={{ textDecoration: "none" }} to="/home">Join the Shoe.Store Community</Link>
        </h4>
        Whether you are a patient seeking support, a caregiver looking for opportunities, or a healthcare professional wanting to make a difference, we invite you to join the Shoe.Store community. Together, we can redefine healthcare, one personalized connection at a time.
        At Shoe.Store, we are not just linking patients to care; we are building bridges to hope, restoring lives, and making a meaningful impact on the journey to recovery. Welcome to a new era of compassionate healthcare – welcome to Shoe.Store.
      </motion.div>
      <div className='pb-4'>
        <Footer />
      </div>
    </motion.div>
  );
}

export default About;

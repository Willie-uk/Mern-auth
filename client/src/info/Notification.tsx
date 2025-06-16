import { motion } from 'framer-motion';
import Footer from '../basic/Footer';
import xvg from "../assets/logo.jpg"

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

function Notification() {
  return (
    <motion.div 
      className='px-5 py-5' 
      style={{ height: "100vh" }} 
      variants={staggerContainer} 
      initial="hidden" 
      animate="show"
    >
      <div className='d-flex gap-2 align-items-start my-4 py-2 px-4' style={{ height: "50px", backdropFilter: "blur(30px)", borderRadius: "15px" }}>
        <h1 className='fw-bold mb-4 text-secondary'>
                Shoe.Store <span className='fw-bold my-4 text-dark'>Notification Page</span>
        </h1>
        <span className="tt not-bell" data-bs-toggle="tooltip" data-bs-placement="right" title="New notification" style={{}}>
          <i className="bi bi-bell-fill"></i>
        </span>
      </div>

      <motion.div 
        className="card col-12 card-nott mb-2" 
        style={{ borderRadius: "25px" }} 
        variants={fadeInUp}
      >
        <div className="card-body d-flex gap-2 align-items-center me-2">
        <img className='text-white d-flex align-items-center justify-content-center col-2' src={xvg} alt="logo" style={{ width: "50px", height: "50px", borderRadius: "50%", }} />
        <div className='col-10'>
            <h5 className='card-title text-start fw-bold'>Shoe.Store</h5>
            <p className='card-text text-start' style={{ color: "grey" }}>Welcome to this platform and invite everyone, Shoe.Store: Smart shoes.</p>
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="card col-12 card-nott mb-2" 
        style={{ borderRadius: "25px" }} 
        variants={fadeInUp}
      >
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">new</span>
        <div className="card-body d-flex gap-2 align-items-center me-2">
          <div className='bg-dark text-white d-flex align-items-center justify-content-center col-2' style={{ width: "50px", height: "50px", borderRadius: "50%", }}>PA</div>
          <div className='col-10'>
            <h5 className='card-title text-start fw-bold'>Admin</h5>
            <p className='card-text text-start' style={{ color: "grey" }}>Hi everyone, any new update or urgent notification will be sent here, for members, check oftenly, thank you.</p>
          </div>
        </div>
      </motion.div>

      <div className="my-5 text-start">
        <motion.div className="my-2" variants={fadeInUp}>
          <h4 className="text-primary">Scheduled Maintenance:</h4>
          <p className="text-secondary">There will be scheduled maintenance on prior alert notice. During this period, access to our platform may be temporarily unavailable. We apologize for any inconvenience and appreciate your understanding as we work to enhance our services.</p>
        </motion.div>
        <motion.div className="my-2" variants={fadeInUp}>
          <h4 className="text-primary">New Features and Improvements:</h4>
          <p className="text-secondary">We are excited to announce the rollout of new features and improvements to enhance your experience with Shoe.Store. Explore the updated platform for an even more seamless and user-friendly interface.</p>
        </motion.div>
        <motion.div className="my-2" variants={fadeInUp}>
          <h4 className="text-primary">Emergency Alerts:</h4>
          <p className="text-secondary">In the event of emergencies or critical updates affecting our services, we will use this notification system to keep you informed. Please stay tuned for any urgent announcements.</p>
        </motion.div>
        <motion.div className="my-2" variants={fadeInUp}>
          <h4 className="text-primary">Community Events:</h4>
          <p className="text-secondary">Join us for upcoming community events, webinars, and workshops. Stay connected with the Shoe.Store community and take advantage of educational opportunities.</p>
        </motion.div>
        <motion.div className="my-2" variants={fadeInUp}>
          <h4 className="text-primary">Feedback and Suggestions:</h4>
          <p className="text-secondary">We value your feedback! If you have suggestions or ideas for improving our services, please reach out to us at shoestore.uk@gmail.com.</p>
        </motion.div>
      </div>

      <div className='pb-4'>
        <Footer />
      </div>
    </motion.div>
  );
}

export default Notification;

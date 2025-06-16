import xvg from "../assets/logo.jpg"

function Footer() {
  return (
    <footer className='my-5 container mx-auto text-center'>
    <div className="row d-flex justify-content-center">
          <div className="d-flex" style={{flexDirection: "column"}}>
            <div className="d-flex flex-column flex-sm-row justify-content-evenly align-items-center mt-5">
            <img src={xvg} alt="logo" style={{width: "100px", height: "100px"}}/>
              <div className="d-flex" style={{flexDirection: "column", gap: "10px"}}>
                <a style={{textDecoration: "none", color: "gray"}}>New</a>
                <a style={{textDecoration: "none", color: "gray"}}>Hot Deals</a>
                <a style={{textDecoration: "none", color: "gray"}}>Coming soon</a>
                <a style={{textDecoration: "none", color: "gray"}}>Tech shoes</a>
              </div>
              <a style={{textDecoration: "none", color: "gray"}} href="paa/medic">New Arrivals</a>
            </div>
            <hr className="mx-auto" style={{width: "60%", opacity: ".1"}}/>
            <div className="d-flex flex-column flex-sm-row text-center justify-content-evenly mt-3">
              <p style={{color: "lightgray"}}>Shoe.Store &copy; 2025</p>
              <small style={{color: "rgb(0,95,135)", opacity: ".3"}}>Shoe.Store <span style={{color: "green"}}>Smart shoes</span></small>
            </div>
          </div>
        </div>
    </footer>
  );
}

export default Footer;

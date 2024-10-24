import Image from "next/image";
import SolarLogo from "../../public/images/solarLogo.png";

export default function Logo () {
    return(
        <Image
        style={{ width: "8rem", display: "inline-block" }}
        // className=" scale-50"
        // style={{ width: "80%" }}
        
        src={SolarLogo}
        alt="My Image"
        unoptimized
        // width={40}
      />
    )
}
// import Script from "next/script";
// import { createRef, useEffect } from "react";

// const TIdio = () => {
      
//         const ref = createRef();
      
//         useEffect(() => {
//           let refValue;
      
//           if (ref.current) {
//             const script = document.createElement("script");
//             script.src =
//               "//code.tidio.co/kryrf6lki4rnjdqqopvqtinvjdqko7ms.js";
      
//             script.async = true;
//             script.type = "text/javascript";
      
//             ref.current.appendChild(script);
//             refValue = ref.current;
//           }
      
//           return () => {
//             if (refValue) {
//               while (refValue.firstChild) {
//                 refValue.removeChild(refValue.firstChild);
//               }
//             }
//           };
//         }, [ref, ]);
      
//         // return <div ref={ref} className=" mt-4 " />;
// }

// export default Tidio
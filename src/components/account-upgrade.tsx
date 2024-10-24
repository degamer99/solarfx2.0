import Link from "next/link";

const AccountTypeInfo = [
    {
      name: "Beginner a/c",
      motto: "New Into Trading ....",
      InitialDeposit: " $100",
      Leverage: "Up to 1:100",
      OrderVolume: "0.1 - 50 lots",
    },
    {
      name: "Standard a/c",
      motto: "Already Into Trading ....",
      InitialDeposit: " $500",
      Leverage: "Up to 1:500",
      OrderVolume: "0.01 - 200 lots",
    },
    {
      name: "Master a/c",
      motto: "Expert In Trading ....",
      InitialDeposit: " $1000",
      Leverage: "Up to 1:1000",
      OrderVolume: "0.01 - 500 lots",
    },
  ];
  

export default function AccountUpgrade () {
    // const router = useRouter();
  
    return (
      <section className=" bg-[#f5f8f7] py-8" id="accounts">
        <p className=" text-center text-xl font-bold text-gray-400">
          {" "}
          Account Types{" "}
        </p>
        <h2 className=" text-center text-5xl text-gray-800 font-bold my-4">
          Solarfx Trading <span className="text-green-500">Accounts</span>
        </h2>
        <div className=" grid grid-cols-1 gap-5 place-items-center md:grid-cols-3">
          {AccountTypeInfo.map(
            ({ InitialDeposit, Leverage, OrderVolume, name, motto }, index) => {
              return (
                <ul
                  key={index}
                  className="rounded-md py-1 w-11/12 m-auto mt-8 border-solid border border-gray-300 shadow-[ 0 0 10px 5px black]"
                  style={{ boxShadow: "inset 0 0 30px #ddddddaa " }}
                >
                  <li className="text-center py-8 ">
                    <h3 className="font-bold font-sans text-2xl text-gray-800">
                      {" "}
                      {name}{" "}
                    </h3>
                    <p className="font-bold font-sans text-xl text-gray-500">
                      {" "}
                      {motto}{" "}
                    </p>
                    <p className=" text-7xl font-bold py-10">{InitialDeposit}</p>
                  </li>
                  <li className="bg-gray-200 text-gray-500 flex justify-between text-xl px-6 py-4 font-bold">
                    <span>Initial Deposit</span>{" "}
                    <span className="text-right">{InitialDeposit}</span>
                  </li>
                  <li className=" text-gray-500 flex justify-between text-xl px-6 py-4 font-bold">
                    <span>Order Volume</span>{" "}
                    <span className="text-right ">{OrderVolume}</span>
                  </li>
                  <li className="bg-gray-200 text-gray-500 flex justify-between text-xl px-6 py-4 font-bold">
                    <span>Leverage</span>{" "}
                    <span className="text-right">{Leverage}</span>
                  </li>
                  <Link href="/signup"
                    > 
                  <button
                    className=" py-3 px-10 my-2 block mx-auto bg-gray-500 text-gray-100 rounded-lg font-bold text-xl wor shadow-inner"
                    
                    >
                    Open
                    </button>
                    </Link>
                    {/* className=" py-3 px-10 my-2 block mx-auto bg-gray-500 text-gray-100 rounded-lg font-bold text-xl wor shadow-inner" */}
                </ul>
              );
            }
          )}
        </div>
      </section>
    );
  };
  
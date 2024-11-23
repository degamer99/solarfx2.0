"use client"
import ExpertCard from "@/components/copy-expert-card"
import { useUserData } from "@/components/store"
import { useEffect } from "react"


export default function CopyExpert() {
  const getExpertData = useUserData( state => state.getExpertData)
  const expertData = useUserData( state => state.expertData)
  useEffect(() => {
      getExpertData()
  }, [])
  // const expertData = [
  //   {
  //     name: "Stacy R. Hall",
  //     followers: 30000,
  //     capital: 6500,
  //     profitPercentage: 70,
  //     totalProfit: 450000,
  //     rating: 3,
  //   },
  
  // ]
  return (<div>
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(320px,1fr))] gap-4 mx-auto place-items-center my-4">
      {expertData.map(({ name, followers, capital, profitPercentage, totalProfit, rating, image}) => {
        return <ExpertCard
        key={name}
          name={name}
          followers={followers}
          capital={capital}
          profitPercentage={profitPercentage}
          totalProfit={totalProfit}
          rating={rating}
          image={image}
        />

      })}
      {/* <ExpertCard
        name="Jarvis B. Buckley"
        followers={450000}
        capital="$20,000"
        profitPercentage={96}
        totalProfit="$1,280,000"
        rating={5}
      />
      <ExpertCard
        name="Mara Dao"
        followers={40000}
        capital="$4,000"
        profitPercentage={70}
        totalProfit="$450,000"
        rating={4}
      /> */}

      {/* <Card rating="pro" name=" Stacy R. Hall" followers={30000} minimumCapital={6500}  percentageProfit={70} totalProfit={450000} starRating={3}/> */}
    </div>
  </div>
  )
}
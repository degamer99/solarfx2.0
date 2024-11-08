import ExpertCard from "@/components/copy-expert-card"
import Header from "@/components/Header"
import Ticker from "@/components/ui/ticker"

export default function CopyExpert () {
    return(<div className="w-full"   >
        <Header />
        <Ticker />
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(320px,1fr))] gap-4 mx-auto place-items-center my-4">
              <ExpertCard 
        name="Stacy R. Hall"
        followers={30000}
        capital="$6,500"
        profitPercentage={70}
        totalProfit="$450,000"
        rating={3}
      />
              <ExpertCard 
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
      />

        {/* <Card rating="pro" name=" Stacy R. Hall" followers={30000} minimumCapital={6500}  percentageProfit={70} totalProfit={450000} starRating={3}/> */}
    </div>
    </div>
    )
}
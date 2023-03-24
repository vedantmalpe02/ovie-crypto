import Head from 'next/head'
import styles from '../styles/Home.module.css'
import CoinGecko from 'coingecko-api';
const coinGeckoClient = new CoinGecko();


export default function Home(props) {
  const {data} = props.result;
  console.log(data);
;  
 

const formatPercent= number =>
  `${new Number(number).toFixed(2)}%`

  const formatRupee= (number , maximumSignificantDigits:3) => 
    new Intl.NumberFormat(
      'en-IN',
      {
        style: 'currency',
        currency: 'inr',
        maximumSignificantDigits
      }
    )
    .format(number);
  

  return (
    <div className={styles.container}>
      <Head>
        
        <title>Ovie-Crypto</title>
        <link rel="icon" href='/favicon.ico'/>
      </Head>
      <h1>Ovie-Crypto</h1>
      
      <table className='table'>
        <thead>
          <tr>
          <th>Sr.no.</th>
          <th>Name</th>
            <th>Symbol</th>
            <th>Price</th>
            <th>Volume</th>
            <th>24H Change</th>
            
            <th>Market cap</th>
          </tr>
        </thead>
        <tbody>
          {data.map (coin => (
            <tr key={coin.id}>
              <td>{coin.market_cap_rank}</td>
            <td>{coin.name}</td>
              <td>
                <img
                src={coin.image}
                style={{width:25,height:25,marginRight:10}}
                />
                {coin.symbol.toUpperCase()} 
                </td>
                <td>{formatRupee(coin.current_price,10)}</td>
                <td>{formatRupee(coin.total_volume,12)}</td>
              <td>
                <span 
                className={coin.price_change_percentage_24h> 0 ? (
                  'text-success'
                ) : 'text-danger'}
                >
                  {formatPercent(coin.price_change_percentage_24h)}
                  </span>
                 </td>
             
              <td>{formatRupee(coin.market_cap,12)}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export async function getServerSideProps(context) {
  const params = {
    order: CoinGecko.ORDER.MARKET_CAP_DESC
  }
  const result = await coinGeckoClient.coins.markets({params});
  return{
    props:{
      result
    }
  };
}

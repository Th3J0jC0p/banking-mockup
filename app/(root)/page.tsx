import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';

const Home = () => {
  const loggedIn = { firstName: 'Jacob', lastName: 'Smith', email: 'jacob.smith@gmail.com'};

  return (
    <section className='home'>
      <div className='home-content'>
        <header className="home-header">
          <HeaderBox 
            type = 'greeting'
            title = 'Welcome'
            user = {loggedIn?.firstName || 'Guest'}
            subtext = 'Manage your account here.'
          />

          <TotalBalanceBox 
            accounts = {[]}
            totalBanks = {1}
            totalCurrentBalance = {1250.35}
          />
        </header>
      </div>
      <RightSidebar user={loggedIn} transactions={[]} banks={[{currentBalance: 123.50}, {currentBalance: 2345.03}]}/>
    </section>
  )
}

export default Home
import HeaderBox from '@/components/HeaderBox'
import RecentTransactions from '@/components/RecentTransactions';
import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import { getAccount, getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';

const Home = async ({ searchParams: { id, page } }: SearchParamProps) =>  {
  const currentPage = Number(page as string) || 1;
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({ 
    userId: loggedIn?.$id
  })

  if(!accounts) return;
  
  const accountsData = accounts?.data;
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

  const account = await getAccount({ appwriteItemId })


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
            accounts = {accountsData}
            totalBanks = {accounts?.totalBanks || 0}
            totalCurrentBalance = {accounts?.totalCurrentBalance || 0}
          />
        </header>
        <RecentTransactions page={currentPage} accounts={accountsData} appwriteItemId={appwriteItemId} transactions = {account?.transactions} />
      </div>
      <RightSidebar user={loggedIn} transactions={account?.transactions} banks={accountsData?.slice(0, 2)}/>
    </section>
  )
}

export default Home
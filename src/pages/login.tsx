import { GetServerSidePropsContext } from 'next';
import { getSession, signIn } from 'next-auth/react';
import { useEffect } from 'react';

export default function Login() {
  const handleConnectWallet = async () => {
    if (window.ethereum) {
      try {
        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log('Wallet connected!');
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    } else {
      console.log('Ethereum wallet is not installed!');
    }
  };

  useEffect(() => {
    if (!window.ethereum) {
      console.log('Ethereum wallet not detected.');
    }
  }, []);

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={() => signIn("github")}>Sign in with GitHub</button>
      <button onClick={handleConnectWallet}>
        Connect Wallet
      </button>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession({ req: context.req });

  // Redirect if already logged in
  if (session) {
    return {
      redirect: {
        destination: '/home', // Adjust the destination as needed
        permanent: false,
      },
    };
  }

  return {
    props: {}, // No need to pass 'session' here since it's not used in the component
  };
}

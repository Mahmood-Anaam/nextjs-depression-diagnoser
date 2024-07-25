
import Header from "@/components/layout/header/Header";
import { verifyTokenForPage } from '@/utils/verifyToken';
import { cookies } from 'next/headers';

const RootLayout = ({ children }) => {

  const cookieStore = cookies();
  const token = cookieStore.get('jwtToken')?.value;
  const userPayload = verifyTokenForPage(token);

  return (
    <div style={{ display: "flex" }}>
      <Header userPayload={userPayload}/>
     
      <main
        style={{
          flexGrow: 1,
          padding: "16px",
          marginTop: "64px",
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default RootLayout;

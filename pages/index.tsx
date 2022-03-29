import Page from "@components/App/Page";
import { Button } from "antd";

const HomePage: React.FC<any> = () => {
  return (
    <Page>
      <div className="text-center m-5">
        <h1 className="text-6xl font-bold">Hello World</h1>
        <h2 className="text-lg font-semibold">Start editing to see some magic happen!</h2>
        <Button type="primary">Click Me</Button>
      </div>
    </Page>
  );
};

// export const getServerSideProps: GetServerSideProps = async (_context): Promise<{ props: Props }> => {
//   try {
//     const home = await apolloClient.query<Gql.GetCurrentHomeBannerQuery>({ query: Gql.GetCurrentHomeBannerDocument });
//     const ads = await apolloClient.query<Gql.GetCurrentAdsBannerQuery>({ query: Gql.GetCurrentAdsBannerDocument });
//     return {
//       props: {
//         homeBanner: home.data.getCurrentHomeBanner,
//         adsBanner: ads.data.getCurrentAdsBanner
//       }
//     };
//   } catch (e) {
//     return { props: {} };
//   }
// };

export default HomePage;

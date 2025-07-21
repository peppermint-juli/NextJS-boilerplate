import { Layout } from "components/common/layout";
import { NewPayment } from "components/contents/newPayment";

// TODO: imp loading animation here
export default function MainPage() {
  return (
    <>
      <Layout>
        <NewPayment />
      </Layout>
    </>
  );
};

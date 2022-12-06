import Layout from "../components/Layout";
import { useAuthContext } from "../contexts/AuthContext";

const Home = () => {
  const { user } = useAuthContext();

  return (
    <Layout>
      <div className="w-full p-5 overflow-scroll h-screen">
        <h1 className="text-center text-3xl font-extrabold mb-10 text-black dark:text-white">
          Welcome, <span className="text-blue-500">{user.displayName}</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5 h-[80vh]">
          <div className="shadow-lg bg-cyan-100 text-blue-500 text-lg font-bold text-center p-10 rounded-lg row-span-2 overflow-scroll">
            <p>Today's Tasks</p>
          </div>
          <div className="shadow-lg bg-cyan-100 text-blue-500 text-lg font-bold text-center rounded-lg overflow-scroll">
            <p className="py-3 sticky-top bg-inherit drop-shadow-md">
              Recently Read
            </p>
            <div className="px-10 py-5">
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Cupiditate et distinctio beatae aut, tempore expedita eius illo
                eligendi magnam iusto nostrum, eum itaque nisi error perferendis
                nulla rerum libero accusamus?
              </p>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Cupiditate et distinctio beatae aut, tempore expedita eius illo
                eligendi magnam iusto nostrum, eum itaque nisi error perferendis
                nulla rerum libero accusamus?
              </p>
            </div>
          </div>
          <div className="shadow-lg bg-cyan-100 text-blue-500 text-lg font-bold text-center rounded-lg overflow-scroll">
            <p className="py-3 sticky-top bg-inherit drop-shadow-md">
              Favorites Notes
            </p>
            <div className="px-10 py-5">
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Cupiditate et distinctio beatae aut, tempore expedita eius illo
                eligendi magnam iusto nostrum, eum itaque nisi error perferendis
                nulla rerum libero accusamus?
              </p>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Cupiditate et distinctio beatae aut, tempore expedita eius illo
                eligendi magnam iusto nostrum, eum itaque nisi error perferendis
                nulla rerum libero accusamus?
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;

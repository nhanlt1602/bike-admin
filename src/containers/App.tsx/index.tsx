import Hospitals from "../HospitalManagement";
import Layout from "../Layout";
import Symptoms from "../SymptomManagement";

const App = () => {
    return (
        <Layout>
            <Hospitals />
            <Symptoms />
        </Layout>
    );
};

export default App;

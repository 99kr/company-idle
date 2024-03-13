import Layout from "@/components/layout";
import Buy from "@/pages/buy";
import Home from "@/pages/home";
import { Routes, Route } from "react-router-dom";

function App() {
	return (
		<div className="container my-6">
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="buy" element={<Buy />} />

					<Route path="*" element={<>404</>} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;

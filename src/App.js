import React, { Suspense } from "react";
const Todo = React.lazy(() => import("todo/App"));
const Signup = React.lazy(() => import("signup/App"));
function App() {
	return (
		<div className="App">
			<nav className="navbar navbar-expand-lg bg-body-tertiary">
				<div className="container">
					<a className="navbar-brand" href="/">
						Webpack Federation
					</a>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<a className="nav-link active" href="/todo">
									To Do
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="/signup">
									Sign-Up
								</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>
			<div>
				<Suspense fallback={<div>Loading . . .</div>}>
					<Todo />
					<Signup />
				</Suspense>
			</div>
		</div>
	);
}

export default App;


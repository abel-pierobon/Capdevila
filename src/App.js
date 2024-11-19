import { BrowserRouter } from 'react-router-dom';
import { ContextTurneroProvider } from './ContextTurnero';
import { Toaster } from 'sonner';
import Main from './Main';
import NavBar from './NavBar';
import Footer from './Footer';
function App() {
    return (
        <BrowserRouter>
            <ContextTurneroProvider>
                    <NavBar />
                    <Toaster
                        position="top-center"
                        expand={false}
                        autoClose={2000}
                        duration={4000}
                        closeOnClick={true}
                        richColors
                    />
                    
                    <Main />
                    <Footer />
            </ContextTurneroProvider>
        </BrowserRouter>
    );
}

export default App;

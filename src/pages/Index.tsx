
import Header from "../components/Header";
import ChatInterface from "../components/ChatInterface";

const Index = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 overflow-hidden">
        <ChatInterface />
      </main>
    </div>
  );
};

export default Index;

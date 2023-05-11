import './index.scss';
import "@fontsource/playfair-display/600.css";
import PictureCard from './components/PictureCard';
import workList from './lib/workList';

function App() {
  return (
    <main>
      <div className="work-list">
        {workList.slice(0, 4).map((workItem, i) => (
          <PictureCard
            key={i}
            name={workItem.name}
            href={workItem.link}
            images={workItem.images}
          />
        ))}

        <div className='placeholder'>We prompt to contact us with a CTA after a few projects here.</div>

        {workList.slice(4, workList.length).map((workItem, i) => (
          <PictureCard
            key={i}
            name={workItem.name}
            href={workItem.link}
            images={workItem.images}
          />
        ))}
      </div>
    </main>
  )
}

export default App


import Positioning from '../sections/Positioning';
import ColorChapter from '../sections/ColorChapter';
import ArchitectureScene from '../sections/ArchitectureScene';
import ShapeChapter from '../sections/ShapeChapter';
import GraphicElement from '../sections/GraphicElement';
import DesignSystemShowcase from '../sections/DesignSystemShowcase';
import Footer from '../sections/Footer';

export default function System() {
  return (
    <main>
      <header className="page-head wrap">
        <h1 className="display">The Design System</h1>
        <p className="lead">Same coordinates, same palette, same mark.</p>
        <p className="body">
          The comparative logic of the system — how one mark, one palette, and one
          grid language scale across three brands, side by side.
        </p>
      </header>
      <Positioning />
      <ColorChapter />
      <ArchitectureScene />
      <ShapeChapter />
      <GraphicElement vid="existence" />
      <GraphicElement vid="time-creationism" />
      <GraphicElement vid="time-creation-project" />
      <DesignSystemShowcase />
      <Footer />
    </main>
  );
}

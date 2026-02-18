import { fullscreenCanvas, handleResize } from '@shared/p5-utils';
import p5 from 'p5';
import { Flock } from './flock';


new p5((p: p5) => {
    const flock = new Flock();

    p.setup = () => {
        fullscreenCanvas(p)
        flock.initAgents(p);
    }

    p.draw = () => {
        p.background(10, 10, 10, 40)

        flock.draw(p);
    }

    p.windowResized = () => handleResize(p)
})
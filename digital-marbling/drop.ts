import { Vector2 } from "@shared/math/Vector2";
import type p5 from "p5";

export class Drop {
    center: Vector2;
    radius: number;
    resolution: number = 100;
    vertices: Vector2[] = [];
    color: string;

    constructor(center: Vector2, radius: number, color: string) {
        this.center = center;
        this.radius = radius;
        this.color = color;

        for (let i = 0; i < this.resolution; i++) {
            const angle = 2 * Math.PI * i / this.resolution;
            const x = this.center.x + Math.cos(angle) * this.radius;
            const y = this.center.y + Math.sin(angle) * this.radius;
            this.vertices.push(new Vector2(x, y));
        }
    }

    draw(p: p5) {
        p.noStroke();
        p.fill(this.color);

        p.beginShape();

        for (let i = 0; i < this.vertices.length; i++) {
            p.vertex(this.vertices[i].x, this.vertices[i].y);
        }

        p.endShape(p.CLOSE);
    }

    displace(newDrop: Drop) {
        const radius = newDrop.radius;
        const center = newDrop.center.copy();

        for (let i = 0; i < this.vertices.length; i++) {
            let vertex = this.vertices[i];

            const mag = 1 + (radius * radius) / Math.pow(Vector2.euclideanDistance(vertex, center), 2);
            const res = vertex.copy().subtract(center.copy()).multiply(Math.sqrt(mag));
            vertex = center.copy().add(res);

            this.vertices[i] = vertex;
        }
    }

    _stroke(m: Vector2, x: number, y: number) {
        const z = 2;
        const c = 16;

        let u = 1 / Math.pow(2, 1 / c);
        let b = new Vector2(x, y);

        for (let i = 0; i < this.vertices.length; i++) {
            let v = this.vertices[i];

            let pb = v.subtract(b, false);
            let n = m.copy().rotate(Math.PI / 2);
            let d = Math.abs(pb.dot(n));
            let mag = z * Math.pow(u, d);
            v.add(m.copy().multiply(mag));

            this.vertices[i] = v;
        }
    }

    stroke(m: Vector2, x: number, y: number) {
        const z = 2;
        const c = 16;

        let u = 1 / Math.pow(2, 1 / c);

        for (let i = 0; i < this.vertices.length; i++) {
            let v = this.vertices[i];

            let mag = Math.abs(v.x - x);

            v.x = v.x;
            v.y = v.y + z * Math.pow(u, mag);

            this.vertices[i] = v;
        }
    }
}
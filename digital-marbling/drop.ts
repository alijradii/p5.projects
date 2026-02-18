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
}
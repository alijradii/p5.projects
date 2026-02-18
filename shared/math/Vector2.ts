export class Vector2 {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    add(vector: Vector2, inPlace = true): Vector2 {
        if (inPlace) {
            this.x += vector.x;
            this.y += vector.y;
            return this;
        }
        return new Vector2(this.x + vector.x, this.y + vector.y);
    }

    subtract(vector: Vector2, inPlace = true): Vector2 {
        if (inPlace) {
            this.x -= vector.x;
            this.y -= vector.y;
            return this;
        }
        return new Vector2(this.x - vector.x, this.y - vector.y);
    }

    multiply(scalar: number, inPlace = true): Vector2 {
        if (inPlace) {
            this.x *= scalar;
            this.y *= scalar;
            return this;
        }
        return new Vector2(this.x * scalar, this.y * scalar);
    }

    divide(scalar: number, inPlace = true): Vector2 {
        if (inPlace) {
            this.x /= scalar;
            this.y /= scalar;
            return this;
        }
        return new Vector2(this.x / scalar, this.y / scalar);
    }

    normalize(inPlace = true): Vector2 {
        const magnitude = Math.sqrt(this.x * this.x + this.y * this.y);

        if (magnitude === 0) {
            return inPlace ? this : new Vector2(this.x, this.y);
        }

        if (inPlace) {
            this.x /= magnitude;
            this.y /= magnitude;
            return this;
        }
        return new Vector2(this.x / magnitude, this.y / magnitude);
    }

    static randomNormalized(): Vector2 {
        const angle = Math.random() * Math.PI * 2;
        return new Vector2(Math.cos(angle), Math.sin(angle));
    }
}
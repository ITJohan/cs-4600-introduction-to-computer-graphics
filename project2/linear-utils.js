// @ts-check

class Vector {
  /**
   * @param {number} p1
   * @param {number} p2
   * @param {number} p3
   */
  constructor(p1, p2, p3) {
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
  }
}

class Matrix {
  /**
   * p11 p12 p13
   * p21 p22 p23
   * p31 p32 p33
   * @param {number} p11
   * @param {number} p21
   * @param {number} p31
   * @param {number} p12
   * @param {number} p22
   * @param {number} p32
   * @param {number} p13
   * @param {number} p23
   * @param {number} p33
   */
  constructor(p11, p21, p31, p12, p22, p32, p13, p23, p33) {
    this.p11 = p11;
    this.p21 = p21;
    this.p31 = p31;
    this.p12 = p12;
    this.p22 = p22;
    this.p32 = p32;
    this.p13 = p13;
    this.p23 = p23;
    this.p33 = p33;
  }
}

class ScaleMatrix {
  #matrix = new Matrix(0, 0, 0, 0, 0, 0, 0, 0, 0);

  /**
   * @param {number} s1
   * @param {number} s2
   */
  constructor(s1, s2) {
    this.s1 = s1;
    this.s2 = s2;
    this.#matrix.p11 = s1;
    this.#matrix.p22 = s2;
  }
}

class RotationMatrix {
  #matrix = new Matrix(0, 0, 0, 0, 0, 0, 0, 0, 0);

  /**
   * @param {number} degrees
   */
  constructor(degrees) {
    this.degrees = degrees;
  }

  set degrees(degrees) {
    this.degrees = degrees;
    const radians = degrees * (Math.PI / 180);
    this.#setMatrix(radians);
  }

  #setMatrix(radians) {
    this.#matrix.p11 = Math.cos(radians);
    this.#matrix.p21 = -Math.sin(radians);
    this.#matrix.p12 = Math.sin(radians);
    this.#matrix.p22 = Math.cos(radians);
  }
}

/**
 * @param {Matrix} matrix
 * @param {Vector} vector
 * @returns {Vector}
 */
export const multiplyMatrixWithVector = (matrix, vector) => {
  const p1Prime =
    vector.p1 * matrix.p11 + vector.p2 * matrix.p12 + vector.p3 * matrix.p13;
  const p2Prime =
    vector.p1 * matrix.p21 + vector.p2 * matrix.p22 + vector.p3 * matrix.p23;
  const p3Prime =
    vector.p1 * matrix.p31 + vector.p2 * matrix.p32 + vector.p3 * matrix.p33;

  return new Vector(p1Prime, p2Prime, p3Prime);
};

/**
 * @param {Matrix} matrixA
 * @param {Matrix} matrixB
 * @returns {Matrix}
 */
export const multiplyMatrixWithMatrix = (matrixA, matrixB) => {
  const p11 =
    matrixA.p11 * matrixB.p11 +
    matrixA.p12 * matrixB.p21 +
    matrixA.p13 * matrixB.p31;
  const p12 =
    matrixA.p11 * matrixB.p12 +
    matrixA.p12 * matrixB.p22 +
    matrixA.p13 * matrixB.p32;
  const p13 =
    matrixA.p11 * matrixB.p13 +
    matrixA.p12 * matrixB.p23 +
    matrixA.p13 * matrixB.p33;

  const p21 =
    matrixA.p21 * matrixB.p11 +
    matrixA.p22 * matrixB.p21 +
    matrixA.p23 * matrixB.p31;
  const p22 =
    matrixA.p21 * matrixB.p12 +
    matrixA.p22 * matrixB.p22 +
    matrixA.p23 * matrixB.p32;
  const p23 =
    matrixA.p21 * matrixB.p13 +
    matrixA.p22 * matrixB.p23 +
    matrixA.p23 * matrixB.p33;

  const p31 =
    matrixA.p31 * matrixB.p11 +
    matrixA.p32 * matrixB.p21 +
    matrixA.p33 * matrixB.p31;
  const p32 =
    matrixA.p31 * matrixB.p12 +
    matrixA.p32 * matrixB.p22 +
    matrixA.p33 * matrixB.p32;
  const p33 =
    matrixA.p31 * matrixB.p13 +
    matrixA.p32 * matrixB.p23 +
    matrixA.p33 * matrixB.p33;

  return new Matrix(p11, p12, p13, p21, p22, p23, p31, p32, p33);
};

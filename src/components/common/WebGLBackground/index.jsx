import React, { useRef, useEffect } from 'react';
import * as S from './styles';

const VERTEX_SHADER = `
    attribute vec2 position;
    void main() {
        gl_Position = vec4(position, 0.0, 1.0);
    }
`;

const FRAGMENT_SHADER = `
    precision mediump float;

    uniform vec2 u_resolution;
    uniform float u_time;

    // Colors
    const vec3 c_bg = vec3(5.0, 5.0, 5.0) / 255.0;
    const vec3 c_primary = vec3(105.0, 50.0, 226.0) / 255.0; // #6932e2
    const vec3 c_secondary = vec3(160.0, 105.0, 255.0) / 255.0; // #a069ff

    // Random noise for dithering
    float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    void main() {
        vec2 st = gl_FragCoord.xy / u_resolution.xy;
        
        // Correct aspect ratio for shapes
        float aspect = u_resolution.x / u_resolution.y;
        vec2 st_aspect = st;
        st_aspect.x *= aspect;

        // Animated positions (slow movement)
        vec2 pos1 = vec2(0.3 * aspect, 0.4) + vec2(sin(u_time * 0.15) * 0.3, cos(u_time * 0.1) * 0.2);
        vec2 pos2 = vec2(0.7 * aspect, 0.6) + vec2(cos(u_time * 0.12) * 0.3, sin(u_time * 0.17) * 0.2);
        
        // Radial gradients
        float d1 = length(st_aspect - pos1);
        float d2 = length(st_aspect - pos2);
        
        // Soft falloffs
        float glow1 = exp(-d1 * 1.5); 
        float glow2 = exp(-d2 * 1.5); 

        // Mixing
        vec3 color = c_bg;
        color = mix(color, c_primary, glow1 * 0.35);
        color = mix(color, c_secondary, glow2 * 0.3);

        // --- DITHERING ---
        // Add minimal noise to break up banding
        float noise = random(gl_FragCoord.xy);
        color += (noise - 0.5) / 255.0 * 4.0; // 4.0/255 intensity

        gl_FragColor = vec4(color, 1.0);
    }
`;

const WebGLBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext('webgl');

    if (!gl) return;

    const createShader = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertShader = createShader(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragShader = createShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    const program = gl.createProgram();
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }

    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionAttributeLocation = gl.getAttribLocation(program, 'position');
    const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution');
    const timeUniformLocation = gl.getUniformLocation(program, 'u_time');

    let animationFrameId;
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const render = (time) => {
      time *= 0.001;

      gl.useProgram(program);
      gl.enableVertexAttribArray(positionAttributeLocation);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

      gl.uniform2f(resolutionUniformLocation, canvas.width, canvas.height);
      gl.uniform1f(timeUniformLocation, time);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };

    render(0);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
      gl.deleteProgram(program);
    };
  }, []);

  return (
    <S.CanvasContainer>
      <S.Canvas ref={canvasRef} />
    </S.CanvasContainer>
  );
};

export default WebGLBackground;

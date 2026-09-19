import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  color: string;
  size: number;
}

export const Hero3DHologram: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 480);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 480);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Generate 3D sphere particles
    const particleCount = 280;
    const radius = Math.min(width, height) * 0.38;
    const particles: Particle[] = [];

    const colors = [
      '#38bdf8', // Cyan
      '#0284c7', // Sky blue
      '#818cf8', // Indigo
      '#34d399', // Emerald
      '#a855f7', // Purple
    ];

    for (let i = 0; i < particleCount; i++) {
      // Golden spiral distribution on sphere
      const phi = Math.acos(1 - (2 * (i + 0.5)) / particleCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      particles.push({
        x,
        y,
        z,
        baseX: x,
        baseY: y,
        baseZ: z,
        color: colors[i % colors.length],
        size: Math.random() * 2.2 + 1.2,
      });
    }

    // Threat / Defense target nodes on the sphere
    const targetNodes = [
      { lat: 0.3, lon: 1.2, label: 'DNS Verified', type: 'safe' },
      { lat: -0.5, lon: 2.8, label: 'Phishing Intercepted', type: 'scam' },
      { lat: 0.8, lon: -1.5, label: 'UPI Blacklist Lock', type: 'alert' },
      { lat: -0.2, lon: -0.7, label: 'OCR Verified Letter', type: 'safe' },
    ];

    let angleX = 0.15;
    let angleY = 0;
    let scanY = -radius;
    let scanDirection = 1;
    let targetAngleX = 0.15;
    let targetAngleY = 0;

    // Responsive 3D cursor movement
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      targetAngleY = nx * 1.6;
      targetAngleX = -ny * 1.2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Continuous rotation + smooth cursor follow
      angleY += (targetAngleY + 0.005 - angleY) * 0.06;
      angleX += (targetAngleX - angleX) * 0.06;

      // Scan laser oscillation
      scanY += scanDirection * 1.5;
      if (scanY > radius) scanDirection = -1;
      if (scanY < -radius) scanDirection = 1;

      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      const centerX = width / 2;
      const centerY = height / 2;
      const fov = 400;

      // Sort particles by depth Z
      const projected = particles.map((p) => {
        // Rotate around Y
        let x1 = p.baseX * cosY - p.baseZ * sinY;
        let z1 = p.baseZ * cosY + p.baseX * sinY;

        // Rotate around X
        let y2 = p.baseY * cosX - z1 * sinX;
        let z2 = z1 * cosX + p.baseY * sinX;

        const scale = fov / (fov + z2 + radius * 1.2);
        const x2d = centerX + x1 * scale;
        const y2d = centerY + y2 * scale;
        const alpha = Math.max(0.1, Math.min(1, (z2 + radius) / (2 * radius)));

        return {
          x2d,
          y2d,
          z: z2,
          scale,
          alpha,
          color: p.color,
          size: p.size * scale,
          baseY: p.baseY,
        };
      });

      projected.sort((a, b) => a.z - b.z);

      // Draw glowing central orb aura
      const grad = ctx.createRadialGradient(
        centerX,
        centerY,
        10,
        centerX,
        centerY,
        radius * 1.1
      );
      grad.addColorStop(0, 'rgba(56, 189, 248, 0.14)');
      grad.addColorStop(0.5, 'rgba(99, 102, 241, 0.06)');
      grad.addColorStop(1, 'rgba(3, 7, 18, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.1, 0, Math.PI * 2);
      ctx.fill();

      // Draw Orbiting 3D Latitude/Longitude Rings
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.18)';
      ctx.lineWidth = 1;
      
      // Equator Ring
      ctx.beginPath();
      for (let a = 0; a <= Math.PI * 2; a += 0.08) {
        const rx = radius * Math.cos(a);
        const rz = radius * Math.sin(a);
        const rx1 = rx * cosY - rz * sinY;
        const rz1 = rz * cosY + rx * sinY;
        const ry2 = -rz1 * sinX;
        const rz2 = rz1 * cosX;
        const scale = fov / (fov + rz2 + radius * 1.2);
        const px = centerX + rx1 * scale;
        const py = centerY + ry2 * scale;
        if (a === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();

      // Draw laser scanning line
      const scanScale = fov / (fov + radius);
      const scanPixelY = centerY + scanY * scanScale;
      const scanGradient = ctx.createLinearGradient(
        centerX - radius * scanScale,
        scanPixelY,
        centerX + radius * scanScale,
        scanPixelY
      );
      scanGradient.addColorStop(0, 'rgba(56, 189, 248, 0)');
      scanGradient.addColorStop(0.5, 'rgba(56, 189, 248, 0.7)');
      scanGradient.addColorStop(1, 'rgba(56, 189, 248, 0)');
      
      ctx.strokeStyle = scanGradient;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(centerX - radius * 0.95 * scanScale, scanPixelY);
      ctx.lineTo(centerX + radius * 0.95 * scanScale, scanPixelY);
      ctx.stroke();

      // Draw interconnected network lines for closest nodes
      ctx.lineWidth = 0.6;
      for (let i = 0; i < projected.length; i += 6) {
        for (let j = i + 1; j < Math.min(i + 14, projected.length); j += 2) {
          const p1 = projected[i];
          const p2 = projected[j];
          const dist = Math.hypot(p1.x2d - p2.x2d, p1.y2d - p2.y2d);
          if (dist < 50 && p1.z > -radius * 0.5 && p2.z > -radius * 0.5) {
            ctx.strokeStyle = `rgba(56, 189, 248, ${0.28 * p1.alpha * (1 - dist / 50)})`;
            ctx.beginPath();
            ctx.moveTo(p1.x2d, p1.y2d);
            ctx.lineTo(p2.x2d, p2.y2d);
            ctx.stroke();
          }
        }
      }

      // Draw all 3D sphere particles
      projected.forEach((p) => {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x2d, p.y2d, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Extra specular glow on frontmost particles
        if (p.z > radius * 0.3) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
          ctx.beginPath();
          ctx.arc(p.x2d, p.y2d, p.size * 0.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Reset global alpha
      ctx.globalAlpha = 1;

      // Draw 3D security node callouts
      targetNodes.forEach((node, i) => {
        const phi = node.lat;
        const theta = node.lon + angleY;
        const x = radius * Math.cos(phi) * Math.sin(theta);
        const y = radius * Math.sin(phi);
        const z = radius * Math.cos(phi) * Math.cos(theta);

        const x1 = x * cosY - z * sinY;
        const z1 = z * cosY + x * sinY;
        const y2 = y * cosX - z1 * sinX;
        const z2 = z1 * cosX + y * sinX;

        if (z2 > -radius * 0.2) {
          const scale = fov / (fov + z2 + radius * 1.2);
          const px = centerX + x1 * scale;
          const py = centerY + y2 * scale;

          // Outer pulse ring
          const pulse = (Date.now() / 300 + i) % 3;
          ctx.strokeStyle =
            node.type === 'safe'
              ? 'rgba(52, 211, 153, 0.7)'
              : node.type === 'scam'
              ? 'rgba(244, 63, 94, 0.85)'
              : 'rgba(251, 191, 36, 0.85)';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(px, py, 4 + pulse * 3, 0, Math.PI * 2);
          ctx.stroke();

          // Node center dot
          ctx.fillStyle =
            node.type === 'safe'
              ? '#34d399'
              : node.type === 'scam'
              ? '#f43f5e'
              : '#fbbf24';
          ctx.beginPath();
          ctx.arc(px, py, 4, 0, Math.PI * 2);
          ctx.fill();

          // Label pill
          ctx.font = '10px "JetBrains Mono", monospace';
          ctx.fillStyle = '#f8fafc';
          ctx.fillText(node.label, px + 10, py - 4);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full h-[450px] sm:h-[520px] flex items-center justify-center cursor-grab active:cursor-grabbing">
      {/* 3D Holographic Canvas with Cursor Interaction */}
      <canvas
        ref={canvasRef}
        className="w-full h-full pointer-events-auto"
      />
    </div>
  );
};

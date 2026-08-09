import * as React from "react";
import { CANVAS_DIM_OPACITY } from "~/src/infinite-canvas/constants";
import { setCanvasDimTarget } from "~/src/infinite-canvas/dim-state";
import { useIsTouchDevice } from "~/src/use-is-touch-device";
import { clamp } from "~/src/utils";
import { CATEGORIES } from "./categories";
import styles from "./style.module.css";

const FAN_RADIUS_MIN = 260;
const FAN_RADIUS_MIN_MOBILE = 110;
const FAN_RADIUS_MOBILE_BREAKPOINT = 848; // matches the 53em CSS breakpoint
const FAN_RADIUS_MAX = 640;
const FAN_RADIUS_VIEWPORT_RATIO = 0.42;
const FAN_ZONE_BUFFER = 220;
const FAN_STAGGER_MS = 35;

const computeFanRadius = (): number => {
  const min = window.innerWidth < FAN_RADIUS_MOBILE_BREAKPOINT ? FAN_RADIUS_MIN_MOBILE : FAN_RADIUS_MIN;
  return clamp(Math.min(window.innerWidth, window.innerHeight) * FAN_RADIUS_VIEWPORT_RATIO, min, FAN_RADIUS_MAX);
};

type FrameProps = {
  showName?: boolean;
  showTopNav?: boolean;
};

export function Frame({ showName = true, showTopNav = true }: FrameProps) {
  const isTouchDevice = useIsTouchDevice();
  const [active, setActive] = React.useState(false);
  const [radius, setRadius] = React.useState(() => computeFanRadius());
  const wrapRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const onResize = () => setRadius(computeFanRadius());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  React.useEffect(() => {
    setCanvasDimTarget(active ? CANVAS_DIM_OPACITY : 1);
  }, [active]);

  React.useEffect(() => {
    const onHashChange = () => setActive(false);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  React.useEffect(() => {
    if (!isTouchDevice || !active) {
      return;
    }

    const onPointerDown = (e: PointerEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setActive(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [isTouchDevice, active]);

  const handleMouseEnter = () => {
    if (!isTouchDevice) {
      setActive(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isTouchDevice) {
      setActive(false);
    }
  };

  const handleHitZoneClick = () => {
    if (isTouchDevice) {
      setActive((prev) => !prev);
    }
  };

  return (
    <header className={`frame ${styles.frame}`}>
      {showName && (
        // biome-ignore lint/a11y/noStaticElementInteractions: decorative hover region only; the actual control is the button below
        <div ref={wrapRef} className={styles.nameWrap} onMouseLeave={handleMouseLeave}>
          <button
            type="button"
            className={styles.hitZone}
            onMouseEnter={handleMouseEnter}
            onClick={handleHitZoneClick}
            aria-expanded={active}
            aria-label="Toggle portfolio categories"
          />

          <div
            className={styles.fanZone}
            data-active={active}
            style={{ width: `${(radius + FAN_ZONE_BUFFER) * 2}px`, height: `${(radius + FAN_ZONE_BUFFER) * 2}px` }}
          />

          <h1 className={`${styles.frame__title} ${active ? styles.frame__titleActive : ""}`}>Kamya Agarwal</h1>

          <div className={styles.fan} data-active={active}>
            {CATEGORIES.map((category, i) => {
              const angle = -90 + i * (360 / CATEGORIES.length);
              const rad = (angle * Math.PI) / 180;
              const x = Math.cos(rad) * radius;
              const y = Math.sin(rad) * radius;
              const delay = active ? `${i * FAN_STAGGER_MS}ms` : "0ms";

              return (
                <React.Fragment key={category.slug}>
                  <span
                    className={styles.connector}
                    style={{ "--rot": `${angle - 90}deg`, height: `${radius}px`, transitionDelay: delay } as React.CSSProperties}
                  />
                  <a
                    className={styles.categoryLabel}
                    style={{ "--x": `${x}px`, "--y": `${y}px`, transitionDelay: delay } as React.CSSProperties}
                    href={`#album/${category.slug}`}
                  >
                    {category.label}
                  </a>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      )}

      {showTopNav && (
        <>
          <button
            type="button"
            className={styles.frame__gallery}
            onClick={() => {
              window.location.hash = "";
            }}
          >
            Gallery
          </button>
          <a className={styles.frame__film} href="#film">
            Film
          </a>
          <a className={styles.frame__about} href="#about">
            About
          </a>
          <a className={styles.frame__contact} href="#contact">
            Contact
          </a>
        </>
      )}
      <div className={styles.frame__credits}>
        <span>By </span>
        <a>Kamya Agarwal</a>
      </div>
    </header>
  );
}

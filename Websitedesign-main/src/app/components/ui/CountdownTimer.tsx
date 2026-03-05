import { useState, useEffect } from "react";
import clsx from "clsx";

interface CountdownTimerProps {
  initialHours?: number;
  initialMinutes?: number;
  initialSeconds?: number;
  className?: string;
  labelSize?: string;
  resetAtHours?: number;
  resetAtMinutes?: number;
}

export function CountdownTimer({
  initialHours = 14,
  initialMinutes = 45,
  initialSeconds = 6,
  className,
  labelSize = "text-xs",
  resetAtHours = 13,
  resetAtMinutes = 0,
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: initialHours,
    minutes: initialMinutes,
    seconds: initialSeconds,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds -= 1;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes -= 1;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours -= 1;
            } else {
              // Should not really happen for a repeating 14h timer, but for robustness:
              hours = 23;
              if (days > 0) {
                days -= 1;
              }
            }
          }
        }

        // Check for reset at 13:00
        if (hours === resetAtHours && minutes === resetAtMinutes && seconds === 0) {
          return {
            days: 0,
            hours: initialHours,
            minutes: initialMinutes,
            seconds: initialSeconds,
          };
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [initialHours, initialMinutes, initialSeconds, resetAtHours, resetAtMinutes]);

  const format = (num: number) => num.toString().padStart(2, "0");

  return (
    <div className={clsx("flex gap-4 font-mono text-2xl font-bold text-white", className)}>
      <div className="text-center">
        {format(timeLeft.days)}
        <span className={clsx("font-sans text-white/40 block mt-1 uppercase tracking-wider", labelSize)}>Day</span>
      </div>
      <div>:</div>
      <div className="text-center">
        {format(timeLeft.hours)}
        <span className={clsx("font-sans text-white/40 block mt-1 uppercase tracking-wider", labelSize)}>Hrs</span>
      </div>
      <div>:</div>
      <div className="text-center">
        {format(timeLeft.minutes)}
        <span className={clsx("font-sans text-white/40 block mt-1 uppercase tracking-wider", labelSize)}>Min</span>
      </div>
      <div>:</div>
      <div className="text-center">
        {format(timeLeft.seconds)}
        <span className={clsx("font-sans text-white/40 block mt-1 uppercase tracking-wider", labelSize)}>Sec</span>
      </div>
    </div>
  );
}

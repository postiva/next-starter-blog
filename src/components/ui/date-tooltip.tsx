import { cn } from "@/lib/utils";
import moment from "moment";
import { useMemo } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

export enum IDateMode {
  absolute = "absolute",
  relative = "relative",
}

export interface IDateTooltip {
  date: Date | null;
  mode?: IDateMode;
  className?: string;
  dateFormat?: string;
}

const DateTooltip: React.FC<IDateTooltip> = ({
  date,
  mode = IDateMode.absolute,
  className,
  dateFormat,
}) => {
  const formattedDate = useMemo(() => {
    const relative = moment(date).fromNow();
    const absolute = moment(date).format(dateFormat || "DD/MM/YYYY");

    const formattedDate = {
      label: mode === IDateMode.absolute ? absolute : relative,
      tooltip: mode === IDateMode.relative ? absolute : relative,
    };

    return formattedDate;
  }, [date, mode]);

  return (
    <Tooltip delayDuration={200}>
      <TooltipTrigger asChild>
        <span className={cn("text-sm", className)}>{formattedDate.label}</span>
      </TooltipTrigger>
      <TooltipContent side="top" align="start">
        <span className={cn("text-sm", className)}>
          {formattedDate.tooltip}
        </span>
      </TooltipContent>
    </Tooltip>
  );
};

export default DateTooltip;

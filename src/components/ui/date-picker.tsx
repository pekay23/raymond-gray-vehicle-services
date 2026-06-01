"use client";

import { useState, useMemo } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday, addMonths, subMonths, startOfWeek, endOfWeek } from "date-fns";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock } from "lucide-react";

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  minDate?: Date;
}

const TIME_SLOTS = [
  "08:00 - 09:00",
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "12:00 - 13:00",
  "13:00 - 14:00",
  "14:00 - 15:00",
  "15:00 - 16:00",
  "16:00 - 17:00",
];

export function DatePicker({ value, onChange, label = "Preferred Date/Time", minDate = new Date() }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(value ? new Date(value) : null);
  const [selectedTime, setSelectedTime] = useState<string>(value ? format(new Date(value), "HH:mm") : "");

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentMonth));
    const end = endOfWeek(endOfMonth(currentMonth));
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    const newDate = new Date(date);
    if (selectedTime) {
      const [hours] = selectedTime.split(":");
      newDate.setHours(parseInt(hours), 0, 0, 0);
    }
    onChange(format(newDate, "yyyy-MM-dd HH:mm"));
    if (!selectedTime) {
      // Keep popover open if no time selected yet
      return;
    }
    setIsOpen(false);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    if (selectedDate) {
      const newDate = new Date(selectedDate);
      const [hours] = time.split(":");
      newDate.setHours(parseInt(hours), 0, 0, 0);
      onChange(format(newDate, "yyyy-MM-dd HH:mm"));
    }
    setIsOpen(false);
  };

  const displayValue = value
    ? format(new Date(value), "EEEE, MMMM d, yyyy") + (selectedTime ? ` at ${selectedTime}` : "")
    : "";

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="w-full">
      <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">
        {label}
      </label>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className={`w-full min-w-0 flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 bg-slate-50 text-left transition-all ${
              selectedDate
                ? "border-blue-600 focus:border-blue-600 ring-4 ring-blue-600/10"
                : "border-slate-200 hover:border-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
            }`}
          >
            <CalendarIcon className={`w-5 h-5 shrink-0 ${selectedDate ? "text-blue-600" : "text-slate-400"}`} />
            <span className={`min-w-0 font-medium leading-snug ${selectedDate ? "text-slate-900" : "text-slate-400"}`}>
              {displayValue || "Select preferred date & time"}
            </span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-[calc(100vw-2rem)] max-w-[24rem] p-0" align="start" sideOffset={8}>
          <div className="p-3 sm:p-4 bg-white rounded-xl shadow-xl border border-slate-200">
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                className="p-2 hover:bg-slate-100 rounded-lg transition"
              >
                <ChevronLeft className="w-5 h-5 text-slate-600" />
              </button>
              <span className="font-bold text-slate-900">
                {format(currentMonth, "MMMM yyyy")}
              </span>
              <button
                type="button"
                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                className="p-2 hover:bg-slate-100 rounded-lg transition"
              >
                <ChevronRight className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            {/* Week Days Header */}
            <div className="grid grid-cols-7 mb-2">
              {weekDays.map((day) => (
                <div key={day} className="text-center text-xs font-bold text-slate-500 uppercase py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {days.map((day, idx) => {
                const isCurrentMonth = isSameMonth(day, currentMonth);
                const isSelected = selectedDate && isSameDay(day, selectedDate);
                const isDisabled = !isCurrentMonth || day < minDate;
                const isTodayDate = isToday(day);

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={isDisabled}
                    onClick={() => handleDateSelect(day)}
                    className={`size-9 sm:size-10 rounded-lg text-sm font-medium transition-all ${
                      !isCurrentMonth
                        ? "text-slate-300"
                        : isDisabled
                        ? "text-slate-300 cursor-not-allowed"
                        : isSelected
                        ? "bg-blue-600 text-white shadow-md"
                        : isTodayDate
                        ? "bg-blue-100 text-blue-700 font-bold hover:bg-blue-200"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {format(day, "d")}
                  </button>
                );
              })}
            </div>

            {/* Time Slots */}
            {selectedDate && (
              <div className="mt-4 pt-4 border-t border-slate-200">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-slate-500" />
                  <span className="text-sm font-bold text-slate-700 uppercase tracking-wide">
                    Select Time Slot
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {TIME_SLOTS.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => handleTimeSelect(time.split(" - ")[0])}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedTime === time.split(" - ")[0]
                          ? "bg-blue-600 text-white shadow-md"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

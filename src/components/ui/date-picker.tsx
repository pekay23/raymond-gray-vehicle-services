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
      <label className="block text-sm font-bold text-rg-ink mb-2 uppercase tracking-wide">
        {label}
      </label>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className={`w-full min-w-0 flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 bg-rg-bg-2 text-left transition-all ${
              selectedDate
                ? "border-rg-accent focus:border-rg-accent ring-4 ring-rg-accent/10"
                : "border-rg-line hover:border-rg-ink-mute focus:border-rg-accent focus:ring-4 focus:ring-rg-accent/10"
            }`}
          >
            <CalendarIcon className={`w-5 h-5 shrink-0 ${selectedDate ? "text-rg-accent" : "text-rg-ink-mute/70"}`} />
            <span className={`min-w-0 font-medium leading-snug ${selectedDate ? "text-rg-ink" : "text-rg-ink-mute/70"}`}>
              {displayValue || "Select preferred date & time"}
            </span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-[calc(100vw-2rem)] max-w-sm p-0" align="start" sideOffset={8}>
          <div className="p-3 sm:p-4 bg-white rounded-xl shadow-xl border border-rg-line">
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                className="p-2 hover:bg-rg-bg-2 rounded-lg transition"
              >
                <ChevronLeft className="w-5 h-5 text-rg-ink-soft" />
              </button>
              <span className="font-bold text-rg-ink">
                {format(currentMonth, "MMMM yyyy")}
              </span>
              <button
                type="button"
                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                className="p-2 hover:bg-rg-bg-2 rounded-lg transition"
              >
                <ChevronRight className="w-5 h-5 text-rg-ink-soft" />
              </button>
            </div>

            {/* Week Days Header */}
            <div className="grid grid-cols-7 mb-2">
              {weekDays.map((day) => (
                <div key={day} className="text-center text-xs font-bold text-rg-ink-mute uppercase py-2">
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
                        ? "text-rg-ink-mute/40"
                        : isDisabled
                        ? "text-rg-ink-mute/40 cursor-not-allowed"
                        : isSelected
                        ? "bg-rg-accent text-white shadow-md"
                        : isTodayDate
                        ? "bg-rg-accent-subtle text-rg-accent-ink font-bold hover:bg-rg-accent-subtle/80"
                        : "text-rg-ink hover:bg-rg-bg-2"
                    }`}
                  >
                    {format(day, "d")}
                  </button>
                );
              })}
            </div>

            {/* Time Slots */}
            {selectedDate && (
              <div className="mt-4 pt-4 border-t border-rg-line">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-rg-ink-mute" />
                  <span className="text-sm font-bold text-rg-ink uppercase tracking-wide">
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
                          ? "bg-rg-accent text-white shadow-md"
                          : "bg-rg-bg-2 text-rg-ink hover:bg-rg-line"
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

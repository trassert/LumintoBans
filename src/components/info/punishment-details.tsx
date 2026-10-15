import { IoCalendar } from "react-icons/io5";
import { PiScrollFill, PiClockCountdownBold } from "react-icons/pi";
import { FaEarthEurope } from "react-icons/fa6";
import { MdOutlineNotificationsActive } from "react-icons/md";

import { Dictionary } from "@/lib/language/types";
import { PunishmentInfo, PunishmentType } from "@/types";

import { PunishmentStatusDot } from "@/components/punishments/punishment-status-dot";
import { RelativeTimeTooltip } from "@/components/punishments/relative-time-tooltip";

interface PunishmentDetailsProps {
  type: PunishmentType;
  dictionary: Dictionary;
  lang: string;
  punishment: PunishmentInfo;
}

interface DetailRowProps {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}

const DetailRow = ({ icon, label, children }: DetailRowProps) => (
  <div className="space-y-1">
    <h3 className="inline-flex items-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
      {icon}
      {label}
    </h3>
    <div className="text-base leading-relaxed">{children}</div>
  </div>
);

export const PunishmentDetails = ({
  type,
  dictionary,
  lang,
  punishment
}: PunishmentDetailsProps) => {
  const localDictionary = dictionary.pages[`${type}s`];

  return (
    <div className="space-y-4 text-center md:text-left">
      <DetailRow icon={<PiScrollFill className="mr-2 h-4 w-4" />} label={dictionary.words.reason}>
        {punishment.reason}
      </DetailRow>

      <DetailRow icon={<IoCalendar className="mr-2 h-4 w-4" />} label={dictionary.words.date}>
        <RelativeTimeTooltip lang={lang} time={punishment.time} />
      </DetailRow>

      {(type === "ban" || type === "mute") && (
        <DetailRow icon={<PiClockCountdownBold className="mr-2 h-4 w-4" />} label={dictionary.words.expires}>
          <span className="flex items-center justify-center md:justify-start">
            <PunishmentStatusDot dictionary={localDictionary} status={punishment.status} />
            <RelativeTimeTooltip lang={lang} time={punishment.until as Date | string} />
          </span>
        </DetailRow>
      )}

      {type === "warn" && (
        <DetailRow icon={<MdOutlineNotificationsActive className="mr-2 h-4 w-4" />} label={dictionary.words.notified}>
          {punishment.warned ? dictionary.words.yes : dictionary.words.no}
        </DetailRow>
      )}

      <DetailRow icon={<FaEarthEurope className="mr-2 h-4 w-4" />} label={dictionary.words.originServer}>
        {punishment.server}
      </DetailRow>
    </div>
  );
}

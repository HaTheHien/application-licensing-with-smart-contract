import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import RelativeTime from "dayjs/plugin/relativeTime";
import { useMemo } from "react";

dayjs.extend(LocalizedFormat);

dayjs.extend(RelativeTime);

export function useLicenseItem(license, allApps) {
  const isEligible = useMemo(() => {
    return dayjs((license?.dateExpired ?? 0) * 1000).isAfter(dayjs());
  }, [license?.dateExpired]);

  const appName = useMemo(() => {
    return allApps?.find((app) => app.id === license?.appId)?.name ?? "Unknown";
  }, [allApps, license?.appId]);

  const validUntil = useMemo(() => {
    return dayjs((license?.dateExpired ?? 0) * 1000).fromNow();
  }, [license?.dateExpired]);

  const formatExpiredDate = useMemo(() => {
    return dayjs((license?.dateExpired ?? 0) * 1000).format("LL");
  }, [license?.dateExpired]);

  return {
    isEligible,
    appName,
    validUntil,
    formatExpiredDate,
  };
}

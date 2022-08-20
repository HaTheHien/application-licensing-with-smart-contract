import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import RelativeTime from "dayjs/plugin/relativeTime";
import { useMemo } from "react";

dayjs.extend(LocalizedFormat);

dayjs.extend(RelativeTime);

export function useLicenseItem(license, allApps) {
  const isEligible = useMemo(() => {
    return (
      license?.dateExpired === 0 ||
      dayjs((license?.dateExpired ?? 0) * 1000).isAfter(dayjs())
    );
  }, [license?.dateExpired]);

  const app = useMemo(() => {
    return allApps?.find((app) => app.id === license?.appId);
  }, [allApps, license?.appId]);

  const appName = useMemo(() => {
    return app?.name ?? "Unknown";
  }, [app?.name]);

  const validUntil = useMemo(() => {
    return license?.dateExpired === 0
      ? "∞"
      : dayjs((license?.dateExpired ?? 0) * 1000).fromNow();
  }, [license?.dateExpired]);

  const formatExpiredDate = useMemo(() => {
    return license?.dateExpired === 0
      ? "Forever"
      : dayjs((license?.dateExpired ?? 0) * 1000).format("LLL");
  }, [license?.dateExpired]);

  return {
    isEligible,
    app,
    appName,
    validUntil,
    formatExpiredDate,
  };
}

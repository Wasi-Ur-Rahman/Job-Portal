module NotificationsHelper
  def notification_stream_name(user)
    [ user, :notifications ]
  end

  def notification_badge_dom_id(user)
    dom_id(user, :notification_badge)
  end

  def notifications_panel_dom_id(user)
    dom_id(user, :notifications_panel)
  end
end

class Notification < ApplicationRecord
  belongs_to :user
  enum :kind, {
    new_job_application: 0,
    application_update: 1,
    job_recommendation: 2,
    system_announcement: 3,
    recruiter_approved: 4,
    recruiter_rejected: 5,
    admin_approved_recruiter: 6
  }

  validates :title, presence: true

  scope :unread, -> { where(read_at: nil) }
  scope :read, -> { where.not(read_at: nil) }
  scope :recent, -> { order(created_at: :desc) }
  scope :by_kind, ->(kind) { where(kind: kind) }

  after_create_commit :broadcast_user_notifications
  after_update_commit :broadcast_user_notifications, if: :saved_change_to_read_at?
  after_destroy_commit :broadcast_user_notifications

  def read?
    read_at.present?
  end

  def unread?
    read_at.blank?
  end

  def mark_as_read!
    update!(read_at: Time.current) unless read?
  end

  def self.broadcast_refresh_for!(user)
    unread_count = user.notifications.unread.count
    notifications = user.notifications.recent.page(1).per(10)

    Turbo::StreamsChannel.broadcast_replace_to(
      [ user, :notifications ],
      target: ActionController::Base.helpers.dom_id(user, :notification_badge),
      partial: "shared/notification_badge",
      locals: { user: user }
    )

    Turbo::StreamsChannel.broadcast_replace_to(
      [ user, :notifications ],
      target: ActionController::Base.helpers.dom_id(user, :notifications_panel),
      partial: "notifications/panel",
      locals: {
        notifications: notifications,
        unread_count: unread_count,
        user: user
      }
    )
  end

  private

  def broadcast_user_notifications
    self.class.broadcast_refresh_for!(user)
  end
end

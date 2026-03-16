class AddStatusToRecruiterMemberships < ActiveRecord::Migration[7.1]
  def change
    add_column :recruiter_memberships, :status, :string, default: 'pending'
    add_index :recruiter_memberships, :status
  end
end

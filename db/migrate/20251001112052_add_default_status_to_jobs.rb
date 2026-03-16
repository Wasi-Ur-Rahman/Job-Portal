class AddDefaultStatusToJobs < ActiveRecord::Migration[7.1]
  def change
    change_column_default :jobs, :status, from: nil, to: 0
    change_column_null :jobs, :status, false, 0
  end
end

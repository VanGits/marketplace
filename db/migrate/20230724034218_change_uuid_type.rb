class ChangeUuidType < ActiveRecord::Migration[7.0]
  def change
    change_column :messages, :uuid, :text
  end
end

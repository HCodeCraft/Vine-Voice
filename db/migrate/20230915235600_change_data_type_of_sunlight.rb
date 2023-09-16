class ChangeDataTypeOfSunlight < ActiveRecord::Migration[6.1]
  def change

    change_column :plants, :sunlight, "varchar[] USING (string_to_array(sunlight, ','))"

  

  end
end


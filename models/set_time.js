"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Set_Time extends Model {
    static associate({ Band, Event, Stage }) {
      // band
      Set_Time.belongsTo(Band, {
        foreignKey: "band_id",
        as: "band",
      });

      // event
      Set_Time.belongsTo(Event, {
        foreignKey: "event_id",
        as: "event",
      });

      // stage
      Set_Time.belongsTo(Stage, {
        foreignKey: "stage_id",
        as: "stage",
      });
    }
  }
  Set_Time.init(
    {
      event_id: {
        type: DataTypes.SMALLINT,
        allowNull: false,
      },
      stage_id: {
        type: DataTypes.SMALLINT,
        allowNull: false,
      },
      band_id: {
        type: DataTypes.SMALLINT,
        allowNull: false,
      },
      start_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      set_time_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    {
      sequelize,
      modelName: "Set_Time",
      tableName: "set_times",
      timestamps: false,
    }
  );
  return Set_Time;
};





'use strict';

module.exports = function(sequelize, DataTypes) {


    /**     Drop tables if exist    **/
    var tabledrops = [  
                        'insurance_needed_by_company_types', 
                        'insurance_needed_by_company_activities',
                        'insurance_needed_by_employee_types',
                        'insurance_needed_by_employee_activities',  
                        'insurance_covers_risks',
                        'cover_examples', 
                        'company_types', 
                        'company_activities',
                        'employee_activities',
                        'employee_types',
                        'risk_types', 
                        'insurance_types'
                    ]; 
    // for(var i in tabledrops){
    //     sequelize.query("DROP TABLE IF EXISTS " + tabledrops[i] + "");
    // }


    /*********************************/
    /***** Model: Insurance Type *****/
    /*********************************/

    var InsuranceType = sequelize.define('insurance_type', {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        important: DataTypes.STRING,
        icon: DataTypes.STRING
    });


    /*********************************/
    /***** Model: Example Covers *****/
    /*********************************/

    var CoverExample = sequelize.define('cover_example', {
        accident: DataTypes.STRING,
        cover: DataTypes.STRING
    });
    CoverExample.belongsTo(InsuranceType);


    /*********************************/
    /***** Model: Risks          *****/
    /*********************************/

    var RiskType = sequelize.define('risk_type', {
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        icon: DataTypes.STRING
    });


    /****************************************************/
    /*****  Model: (n:m) insurance convers risk     *****/
    /****************************************************/

    var InsuranceCoversRisk = sequelize.define('insurance_covers_risk', {});
    RiskType.belongsToMany(InsuranceType, {
      through: {
        model: InsuranceCoversRisk
      }
    });
    InsuranceType.belongsToMany(RiskType, {
      through: {
        model: InsuranceCoversRisk
      }
    });


    /*********************************/
    /***** Model: CompanyType          *****/
    /*********************************/

    var CompanyType = sequelize.define('company_type', {
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        icon: DataTypes.STRING
    });


    /******************************************************/
    /*****  Model: (n:m) insurance needed by comp type  ***/
    /******************************************************/

    var InsuranceNeededByCompanyType = sequelize.define('insurance_needed_by_company_type', {});
    CompanyType.belongsToMany(InsuranceType, {
      through: {
        model: InsuranceNeededByCompanyType
      }
    });
    InsuranceType.belongsToMany(CompanyType, {
      through: {
        model: InsuranceNeededByCompanyType
      }
    });


    /***********************************/
    /***** Model: Company Activity *****/
    /***********************************/

    var CompanyActivity = sequelize.define('company_activity', {
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        icon: DataTypes.STRING
    });


    /**********************************************************/
    /*****  Model: (n:m) insurance needed by comp activity  ***/
    /**********************************************************/

    var InsuranceNeededByCompanyActivity = sequelize.define('insurance_needed_by_company_activity', {});
    CompanyActivity.belongsToMany(InsuranceType, {
      through: {
        model: InsuranceNeededByCompanyActivity
      }
    });
    InsuranceType.belongsToMany(CompanyActivity, {
      through: {
        model: InsuranceNeededByCompanyActivity
      }
    });


    /***********************************/
    /***** Model: Employee Type    *****/
    /***********************************/

    var EmployeeType = sequelize.define('employee_type', {
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        icon: DataTypes.STRING
    });


    /**************************************************************/
    /*****  Model: (n:m) insurance needed by Employee Type  ***/
    /**************************************************************/

    var InsuranceNeededByEmployeeType = sequelize.define('insurance_needed_by_employee_type', {});
    EmployeeType.belongsToMany(InsuranceType, {
      through: {
        model: InsuranceNeededByEmployeeType
      }
    });
    InsuranceType.belongsToMany(EmployeeType, {
      through: {
        model: InsuranceNeededByEmployeeType
      }
    });


    /***********************************/
    /***** Model: Employee Activity   **/
    /***********************************/

    var EmployeeActivity = sequelize.define('employee_activity', {
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        icon: DataTypes.STRING
    });


    /**************************************************************/
    /*****  Model: (n:m) insurance needed by Employee Activity  ***/
    /**************************************************************/

    var InsuranceNeededByEmployeeActivity = sequelize.define('insurance_needed_by_employee_activity', {});
    EmployeeActivity.belongsToMany(InsuranceType, {
      through: {
        model: InsuranceNeededByEmployeeActivity
      }
    });
    InsuranceType.belongsToMany(EmployeeActivity, {
      through: {
        model: InsuranceNeededByEmployeeActivity
      }
    });

    /***********************************/
    /***** Model: Employee Activity   **/
    /***********************************/

    var EmployeeActivity = sequelize.define('employee_activity', {
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        icon: DataTypes.STRING
    });

    /*********************************/
    /*****      Return Models    *****/
    /*********************************/

    return {
        CoverExample,
        InsuranceType,
        RiskType,
        InsuranceCoversRisk,
        EmployeeActivity,
        EmployeeType,
        CompanyActivity,
        CompanyType,
        InsuranceNeededByEmployeeActivity,
        InsuranceNeededByEmployeeType,
        InsuranceNeededByCompanyActivity,
        InsuranceNeededByCompanyType
    }

};

"use client"

import { useState } from "react";
import { updateUnit } from "../actions/updateProfile";

type AppPreferencesProps = {
    unit_system: string,
    theme: string
}

export default function AppPreferences({
    unit_system,
    theme
}: AppPreferencesProps){

    const [unit, setUnit] = useState(unit_system);

    return (
        <section className="mt-6 rounded-card border border-border bg-surface p-card">


            <h2 className="text-xl font-bold">
              App Preferences
            </h2>




            <div className="mt-5 space-y-5">



              <div className="flex items-center justify-between">


                <div>

                  <p className="font-medium">
                    Unit system
                  </p>


                  <p className="text-sm text-text-secondary">
                    Choose measurement system
                  </p>


                </div>


              {
                

                <select 
                    name="unit"
                    value={unit}
                    onChange={async (e) => {
                        const newUnit = e.target.value;

                        setUnit(newUnit);
                        await updateUnit(newUnit);
                    }}
                    className="rounded-button border border-border-light bg-background px-4 py-2"
                >
                    <option value="metric">
                      Metric(kg, cm)
                    </option>

                    <option value="imperial">
                      Imperial(lb, ft/in)
                    </option>
                  
                  

                </select>
              }

              </div>






              <div className="flex items-center justify-between">


                <div>

                  <p className="font-medium">
                    Theme
                  </p>


                  <p className="text-sm text-text-secondary">
                    Appearance mode
                  </p>

                </div>



                <select className="rounded-button border border-border-light bg-background px-4 py-2">

                  <option>
                    Dark
                  </option>


                  <option>
                    Light
                  </option>


                </select>


              </div>



            </div>


          </section>
    )
}
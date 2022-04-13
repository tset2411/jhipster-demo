package com.hrdk.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;

/**
 * A Facility.
 */
@Entity
@Table(name = "facility")
public class Facility implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "facility_id")
    private Long facilityId;

    @OneToMany(mappedBy = "facility")
    @JsonIgnoreProperties(value = { "residents", "facility" }, allowSetters = true)
    private Set<Room> rooms = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Facility id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public Facility name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getFacilityId() {
        return this.facilityId;
    }

    public Facility facilityId(Long facilityId) {
        this.setFacilityId(facilityId);
        return this;
    }

    public void setFacilityId(Long facilityId) {
        this.facilityId = facilityId;
    }

    public Set<Room> getRooms() {
        return this.rooms;
    }

    public void setRooms(Set<Room> rooms) {
        if (this.rooms != null) {
            this.rooms.forEach(i -> i.setFacility(null));
        }
        if (rooms != null) {
            rooms.forEach(i -> i.setFacility(this));
        }
        this.rooms = rooms;
    }

    public Facility rooms(Set<Room> rooms) {
        this.setRooms(rooms);
        return this;
    }

    public Facility addRoom(Room room) {
        this.rooms.add(room);
        room.setFacility(this);
        return this;
    }

    public Facility removeRoom(Room room) {
        this.rooms.remove(room);
        room.setFacility(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Facility)) {
            return false;
        }
        return id != null && id.equals(((Facility) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Facility{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", facilityId=" + getFacilityId() +
            "}";
    }
}
